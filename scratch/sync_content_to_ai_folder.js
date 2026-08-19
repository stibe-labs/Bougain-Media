const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../public/videos/content');
const targetDir = path.join(__dirname, '../public/videos/AI');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
console.log(`Syncing ${files.length} web-optimized VP9+Opus content video files into public/videos/AI/...`);

files.forEach(f => {
  const s = path.join(srcDir, f);
  const t = path.join(targetDir, f);
  fs.copyFileSync(s, t);
  console.log(`  ✓ Copied ${f} => public/videos/AI/${f}`);
});

console.log('ALL CONTENT VIDEOS ARE NOW IN THE WORKING /videos/AI/ ASSET FOLDER!');
