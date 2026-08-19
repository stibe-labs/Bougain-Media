const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/videos/content');
const outputDir = path.join(__dirname, '../public/videos/content');

console.log('Using ffmpeg binary:', ffmpegPath);

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webm') && !f.startsWith('test_'));

console.log(`Found ${files.length} WebM files to re-encode to VP9 + Opus (AI-Video format)...`);

files.forEach((file, index) => {
  const inputPath = path.join(inputDir, file);
  const tempPath = path.join(inputDir, `vp9_${file}`);
  
  console.log(`[${index + 1}/${files.length}] Converting ${file} to VP9+Opus...`);
  
  const cmd = `"${ffmpegPath}" -i "${inputPath}" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k -tile-columns 2 -frame-parallel 1 -auto-alt-ref 1 -lag-in-frames 25 -y "${tempPath}"`;
  
  try {
    execSync(cmd, { stdio: 'inherit' });
    fs.renameSync(tempPath, inputPath);
    console.log(`✓ Re-encoded ${file} (${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)} MB)`);
  } catch (err) {
    console.error(`✗ Error converting ${file}:`, err.message);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
});

console.log('ALL CONTENT VIDEOS CONVERTED TO VP9 + OPUS (EXACT AI VIDEO FORMAT)!');
