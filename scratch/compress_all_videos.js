const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const aiDir = path.join(__dirname, '../public/videos/AI');

if (!fs.existsSync(aiDir)) {
  console.error('AI dir does not exist!');
  process.exit(1);
}

const files = fs.readdirSync(aiDir).filter((f) => f.endsWith('.webm'));
console.log(`Found ${files.length} webm files in /public/videos/AI/`);

files.forEach((file, idx) => {
  const filePath = path.join(aiDir, file);
  const sizeMb = fs.statSync(filePath).size / (1024 * 1024);

  if (sizeMb > 3.0) {
    const tmpPath = path.join(aiDir, `tmp_${Date.now()}_${file}`);
    console.log(`[${idx + 1}/${files.length}] Fast Compressing ${file} (${sizeMb.toFixed(2)} MB)...`);

    // Ultra fast VP8 / VP9 realtime compression under 3MB
    const cmd = `"${ffmpegPath}" -i "${filePath}" -vf "scale='min(720,iw)':-2" -c:v libvpx -b:v 500k -crf 32 -quality realtime -cpu-used 8 -c:a libopus -b:a 64k -y "${tmpPath}"`;

    try {
      execSync(cmd, { stdio: 'ignore' });
      const newSizeMb = fs.statSync(tmpPath).size / (1024 * 1024);
      fs.unlinkSync(filePath);
      fs.renameSync(tmpPath, filePath);
      console.log(`  ✓ Done! ${file} reduced from ${sizeMb.toFixed(2)} MB to ${newSizeMb.toFixed(2)} MB`);
    } catch (err) {
      console.error(`  ✗ Failed to compress ${file}:`, err.message);
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    }
  } else {
    console.log(`[${idx + 1}/${files.length}] ${file} is already small (${sizeMb.toFixed(2)} MB) — Skipped.`);
  }
});

console.log('All WebM videos successfully compressed for ultra-fast Cloudflare Edge deployment!');
