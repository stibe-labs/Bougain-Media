#!/bin/bash
set -euo pipefail

APP_DIR=/var/www/bougain-media
APP_PORT=3032
PM2_NAME=bougain-media
DOMAIN=bougainmedia.com
BUNDLE=/tmp/bougain-media.bundle

echo "==> Isolated deploy to $APP_DIR (port $APP_PORT) — no other projects touched"

if [ ! -f "$BUNDLE" ]; then
  echo "Missing bundle at $BUNDLE"
  exit 1
fi

mkdir -p "$APP_DIR"
cd "$APP_DIR"
PREV_HEAD=""
if [ -d .git ]; then
  PREV_HEAD="$(git rev-parse --verify HEAD 2>/dev/null || true)"
  # Fast path: reuse existing repo and only move to latest bundled main.
  git fetch "$BUNDLE" main
  git checkout -B main FETCH_HEAD
  git reset --hard FETCH_HEAD
else
  git clone -b main "$BUNDLE" .
fi
rm -f "$BUNDLE"

cat > .env.production <<EOF
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}
PORT=${APP_PORT}
EOF

export NEXT_PUBLIC_SITE_URL="https://${DOMAIN}"
export PORT="${APP_PORT}"

if [ ! -d node_modules ]; then
  echo "==> node_modules missing: running npm ci"
  npm ci
elif [ -z "$PREV_HEAD" ]; then
  echo "==> Fresh checkout: running npm ci"
  npm ci
elif git diff --quiet "$PREV_HEAD" HEAD -- package-lock.json package.json; then
  echo "==> package files unchanged: skipping npm ci"
else
  echo "==> package files changed: running npm ci"
  npm ci
fi

npm run build

if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 reload "$PM2_NAME" --update-env
else
  pm2 start npm --name "$PM2_NAME" --cwd "$APP_DIR" -- start -- -p "$APP_PORT"
fi
pm2 save

if [ ! -f /etc/letsencrypt/live/bougainmedia.com/fullchain.pem ]; then
  echo "==> Requesting SSL certificate via webroot (DNS must point to this server)"
  certbot certonly --webroot -w /var/www/html \
    -d bougainmedia.com -d www.bougainmedia.com \
    --non-interactive --agree-tos -m mediaabougain@gmail.com || true
fi

if [ -f /etc/letsencrypt/live/bougainmedia.com/fullchain.pem ]; then
  cat > /etc/nginx/sites-available/bougainmedia.com <<'NGINX'
server {
    listen 80;
    server_name bougainmedia.com www.bougainmedia.com;
    return 301 https://$host$request_uri;
}

server {
    listen 127.0.0.1:8443 ssl;
    server_name bougainmedia.com www.bougainmedia.com;

    ssl_certificate /etc/letsencrypt/live/bougainmedia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bougainmedia.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3032;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3032;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX
else
  echo "WARN: SSL cert missing — enabling HTTP-only proxy until DNS/cert is ready"
  cat > /etc/nginx/sites-available/bougainmedia.com <<'NGINX_HTTP'
server {
    listen 80;
    server_name bougainmedia.com www.bougainmedia.com;

    location / {
        proxy_pass http://127.0.0.1:3032;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX_HTTP
fi

ln -sf /etc/nginx/sites-available/bougainmedia.com /etc/nginx/sites-enabled/bougainmedia.com

nginx -t
systemctl reload nginx

curl -s -o /dev/null -w "local_app:%{http_code}\n" "http://127.0.0.1:${APP_PORT}/" || true

echo "==> Done. PM2: $PM2_NAME on port $APP_PORT"
pm2 describe "$PM2_NAME" | head -20
