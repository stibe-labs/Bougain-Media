const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const mp4SrcDir = path.join(__dirname, '../public/videos/Content video');
const outputDir = path.join(__dirname, '../public/videos/content');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Using ffmpeg path:', ffmpegPath);

const fileMap = {
  'TURN UP CROWN PLAZA.mp4': 'turn-up-crown-plaza.mp4',
  'BOSS REEL_FINAL.mp4': 'boss-reel-final.mp4',
  'chefs kiss_FINAL OUT.mp4': 'chefs-kiss-final-out.mp4',
  'first draft emarath.mp4': 'first-draft-emarath.mp4',
  'GOT emarath_1.mp4': 'got-emarath-1.mp4',
  'Fit&Co Reel 1.mp4': 'fit-co-reel-1.mp4',
  'godha reel final.mp4': 'godha-reel-final.mp4',
  'HAPPY_2.mp4': 'happy-2.mp4',
  'Aicademy New Reel.mp4': 'aicademy-new-reel.mp4',
  'Getwork Vid Fdraft 2.mp4': 'getwork-vid-fdraft-2.mp4',
  'Emarath Interior Finalll Draft_preview.mp4': 'emarath-interior-draft-preview.mp4',
  'Gwnad.mp4': 'gwnad.mp4',
  'keyboard reel final draftt.mp4': 'keyboard-reel-final-draftt.mp4',
  'R2V2.mp4': 'r2v2.mp4',
  'REEL 2 FitGo.mp4': 'reel-2-fitgo.mp4',
  'Revathy Reel 1Draft.mp4': 'revathy-reel-1draft.mp4',
  'V 3.mp4': 'v-3.mp4',
  'V 4.mp4': 'v-4.mp4',
  'V4.mov': 'v4-cut.mp4',
  'v2.mp4': 'v2.mp4',
  'v3 raw A.mp4': 'v3-raw-a.mp4',
  'v6.mp4': 'v6.mp4',
  'v7 a.mp4': 'v7-a.mp4',
  'vc 1.mp4': 'vc-1.mp4'
};

const entries = Object.entries(fileMap);
console.log(`Starting fast compression of ${entries.length} raw MP4 files into web-optimized 720p/1080p MP4s...`);

entries.forEach(([rawName, cleanName], idx) => {
  const srcPath = path.join(mp4SrcDir, rawName);
  const outPath = path.join(outputDir, cleanName);
  
  if (!fs.existsSync(srcPath)) {
    console.warn(`[${idx+1}/${entries.length}] Missing source: ${rawName}`);
    return;
  }

  const rawSizeMb = (fs.statSync(srcPath).size / 1024 / 1024).toFixed(1);
  console.log(`[${idx+1}/${entries.length}] Compressing ${rawName} (${rawSizeMb} MB) => ${cleanName}...`);

  // Compress using H.264 (AAC audio), faststart atom, max height 1080p, crf 26 for ultra fast download & smooth playback
  const cmd = `"${ffmpegPath}" -i "${srcPath}" -vf "scale='min(1080,iw)':-2" -c:v libx264 -preset superfast -crf 26 -c:a aac -b:a 128k -movflags +faststart -y "${outPath}"`;

  try {
    execSync(cmd, { stdio: 'ignore' });
    const outSizeMb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
    console.log(`  ✓ Created ${cleanName} (${outSizeMb} MB) — Reduced from ${rawSizeMb} MB!`);
  } catch (err) {
    console.error(`  ✗ Error compressing ${rawName}:`, err.message);
  }
});

console.log('ALL CONTENT MP4 VIDEOS SUCCESSFULLY COMPRESSED & OPTIMIZED FOR CLOUDFLARE WEB PLAYBACK!');
