const fs = require('fs');
const path = require('path');

const knownAssets = [
  "AMRUTH CONCEPT AD.webm",
  "EASTER VIDEO.webm",
  "HAYYAK AD VIDEO.webm",
  "HNA AD GST.webm",
  "RAIHAT AL ZUHAR.webm",
  "RAIHAT UDIYYA.webm",
  "TOMS PIPES CONCEPT AD.webm",
  "TOMS PIPES METEOR AD.webm",
  "UDDIYA RAIHAT AL ZUHAR.webm",
  "UDIYYA ad raihat.webm",
  "kitkat ad stibe final.webm",
  "mango bite ad.webm",
  "milma ad.webm",
  "solar ad extrawatt.webm",
  "toms pipes.webm"
];

const contentVideos = [
  { clean: "turn-up-crown-plaza.webm", orig: "TURN UP CROWN PLAZA.webm", target: knownAssets[0] },
  { clean: "boss-reel-final.webm", orig: "BOSS REEL_FINAL.webm", target: knownAssets[1] },
  { clean: "chefs-kiss-final-out.webm", orig: "chefs kiss_FINAL OUT.webm", target: knownAssets[2] },
  { clean: "first-draft-emarath.webm", orig: "first draft emarath.webm", target: knownAssets[3] },
  { clean: "got-emarath-1.webm", orig: "GOT emarath_1.webm", target: knownAssets[4] },
  { clean: "fit-co-reel-1.webm", orig: "Fit&Co Reel 1.webm", target: knownAssets[5] },
  { clean: "godha-reel-final.webm", orig: "godha reel final.webm", target: knownAssets[6] },
  { clean: "happy-2.webm", orig: "HAPPY_2.webm", target: knownAssets[7] },
  { clean: "aicademy-new-reel.webm", orig: "Aicademy New Reel.webm", target: knownAssets[8] },
  { clean: "getwork-vid-fdraft-2.webm", orig: "Getwork Vid Fdraft 2.webm", target: knownAssets[9] },
  { clean: "emarath-interior-draft-preview.webm", orig: "Emarath Interior Finalll Draft_preview.webm", target: knownAssets[10] },
  { clean: "gwnad.webm", orig: "Gwnad.webm", target: knownAssets[11] },
  { clean: "keyboard-reel-final-draftt.webm", orig: "keyboard reel final draftt.webm", target: knownAssets[12] },
  { clean: "r2v2.webm", orig: "R2V2.webm", target: knownAssets[13] },
  { clean: "reel-2-fitgo.webm", orig: "REEL 2 FitGo.webm", target: knownAssets[14] },
  { clean: "revathy-reel-1draft.webm", orig: "Revathy Reel 1Draft.webm", target: knownAssets[0] },
  { clean: "v-3.webm", orig: "V 3.webm", target: knownAssets[1] },
  { clean: "v-4.webm", orig: "V 4.webm", target: knownAssets[2] },
  { clean: "v4-cut.webm", orig: "V4.webm", target: knownAssets[3] },
  { clean: "v2.webm", orig: "v2.webm", target: knownAssets[4] },
  { clean: "v3-raw-a.webm", orig: "v3 raw A.webm", target: knownAssets[5] },
  { clean: "v6.webm", orig: "v6.webm", target: knownAssets[6] },
  { clean: "v7-a.webm", orig: "v7 a.webm", target: knownAssets[7] },
  { clean: "vc-1.webm", orig: "vc 1.webm", target: knownAssets[8] }
];

const contentDir = path.join(__dirname, '../public/videos/content');
const aiDir = path.join(__dirname, '../public/videos/AI');

console.log('Replacing public/videos/AI/ static files with re-encoded VP9+Opus Content Videos...');

const cleanVideoMapCode = {};

contentVideos.forEach(({ clean, orig, target }) => {
  const srcFile = path.join(contentDir, clean);
  const dstFile = path.join(aiDir, target);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, dstFile);
    console.log(`  ✓ Overwrote ${target} with ${clean} (VP9+Opus)`);
  }
  const targetUrl = "/videos/AI/" + encodeURIComponent(target);
  cleanVideoMapCode[clean] = targetUrl;
  cleanVideoMapCode[orig] = targetUrl;
  cleanVideoMapCode[target] = targetUrl;
});

console.log('Generating updated cleanVideoMap mapping for cms.ts:');
console.log(JSON.stringify(cleanVideoMapCode, null, 2));
