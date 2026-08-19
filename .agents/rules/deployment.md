# Deployment Guidelines

- **Target Platform**: Cloudflare Workers / Cloudflare Pages.
- **Do NOT deploy to VPS**: Never run VPS deployment scripts (such as `deploy-bougain-isolated.sh`, Docker Compose, or Nginx configurations on VPS). All deployments must target Cloudflare Workers / Cloudflare Pages.
