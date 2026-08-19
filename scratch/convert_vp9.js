const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../public/videos/content');

const mp4Files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mp4'));

console.log(`Starting high-speed VP9 + Opus conversion of ${mp4Files.length} optimized MP4 files...`);

mp4Files.forEach((file, idx) => {
  const mp4Path = path.join(contentDir, file);
  const webmName = file.replace('.mp4', '.webm');
  const webmPath = path.join(contentDir, webmName);
  
  console.log(`[${idx+1}/${mp4Files.length}] Encoding ${file} => ${webmName} (VP9 + Opus)...`);
  const cmd = `"${ffmpegPath}" -i "${mp4Path}" -c:v libvpx-vp9 -b:v 1500k -speed 8 -deadline realtime -threads 8 -c:a libopus -b:a 128k -y "${webmPath}"`;
  
  try {
    execSync(cmd, { stdio: 'ignore' });
    const szMb = (fs.statSync(webmPath).size / 1024 / 1024).toFixed(2);
    console.log(`  ✓ Created ${webmName} (${szMb} MB) — VP9 + Opus WebM!`);
  } catch (err) {
    console.error(`  ✗ Error converting ${file}:`, err.message);
  }
});

console.log('ALL CONTENT VIDEOS CONVERTED TO VP9 + OPUS WEBM (EXACT CODEC AS AI VIDEOS)!');
