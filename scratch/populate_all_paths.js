const fs = require('fs');
const path = require('path');

const filePairs = [
  { clean: "turn-up-crown-plaza.webm", orig: "TURN UP CROWN PLAZA.webm" },
  { clean: "boss-reel-final.webm", orig: "BOSS REEL_FINAL.webm" },
  { clean: "chefs-kiss-final-out.webm", orig: "chefs kiss_FINAL OUT.webm" },
  { clean: "first-draft-emarath.webm", orig: "first draft emarath.webm" },
  { clean: "got-emarath-1.webm", orig: "GOT emarath_1.webm" },
  { clean: "fit-co-reel-1.webm", orig: "Fit&Co Reel 1.webm" },
  { clean: "godha-reel-final.webm", orig: "godha reel final.webm" },
  { clean: "happy-2.webm", orig: "HAPPY_2.webm" },
  { clean: "aicademy-new-reel.webm", orig: "Aicademy New Reel.webm" },
  { clean: "getwork-vid-fdraft-2.webm", orig: "Getwork Vid Fdraft 2.webm" },
  { clean: "emarath-interior-draft-preview.webm", orig: "Emarath Interior Finalll Draft_preview.webm" },
  { clean: "gwnad.webm", orig: "Gwnad.webm" },
  { clean: "keyboard-reel-final-draftt.webm", orig: "keyboard reel final draftt.webm" },
  { clean: "r2v2.webm", orig: "R2V2.webm" },
  { clean: "reel-2-fitgo.webm", orig: "REEL 2 FitGo.webm" },
  { clean: "revathy-reel-1draft.webm", orig: "Revathy Reel 1Draft.webm" },
  { clean: "v-3.webm", orig: "V 3.webm" },
  { clean: "v-4.webm", orig: "V 4.webm" },
  { clean: "v4-cut.webm", orig: "V4.webm" },
  { clean: "v2.webm", orig: "v2.webm" },
  { clean: "v3-raw-a.webm", orig: "v3 raw A.webm" },
  { clean: "v6.webm", orig: "v6.webm" },
  { clean: "v7-a.webm", orig: "v7 a.webm" },
  { clean: "vc-1.webm", orig: "vc 1.webm" }
];

const baseDir = path.join(__dirname, '../public/videos');
const dirAI = path.join(baseDir, 'AI');
const dirContentVideoWebm = path.join(baseDir, 'Content_video_webm');
const dirContent = path.join(baseDir, 'content');

[dirAI, dirContentVideoWebm, dirContent].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Populating VP9+Opus WebM files across all directory/naming conventions...');

filePairs.forEach(({ clean, orig }) => {
  const sourceFile = path.join(dirContent, clean);
  if (!fs.existsSync(sourceFile)) {
    console.error(`Source missing: ${sourceFile}`);
    return;
  }

  // 1. In public/videos/Content_video_webm/ as original name
  fs.copyFileSync(sourceFile, path.join(dirContentVideoWebm, orig));
  
  // 2. In public/videos/AI/ as original name
  fs.copyFileSync(sourceFile, path.join(dirAI, orig));

  // 3. In public/videos/AI/ as clean name
  fs.copyFileSync(sourceFile, path.join(dirAI, clean));

  // 4. In public/videos/content/ as original name
  fs.copyFileSync(sourceFile, path.join(dirContent, orig));

  console.log(`  ✓ Synced ${clean} <=> ${orig}`);
});

console.log('ALL VP9+OPUS CONTENT VIDEOS SUCCESSFULLY SYNCED ACROSS ALL PATH VARIATIONS!');
