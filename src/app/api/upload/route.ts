import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { spawnSync } from "child_process";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET || "bougain-media-bucket";
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-41d833109b8d4143be9228b4d7510632.r2.dev";

async function uploadToR2(key: string, buffer: Buffer, contentType: string) {
  const uploadUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${encodeURIComponent(key)}`;
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": contentType,
    },
    body: new Uint8Array(buffer),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`R2 upload failed for ${key}: ${errText}`);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    let folder = (formData.get("folder") as string) || "videos/Content Videos";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Sanitize folder name
    if (folder === "videos") folder = "videos/Content Videos";
    if (folder === "ai-videos" || folder === "ai") folder = "videos/Bougain AI videos";
    if (folder === "content-videos" || folder === "content") folder = "videos/Content Videos";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase();
    const baseName = path.basename(originalName, ext);
    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9_\-\s]/g, "").trim() || `media-${Date.now()}`;
    const fileName = `${cleanBaseName}${ext}`;
    const r2Key = `${folder}/${fileName}`;

    const contentType = file.type || (
      ext === ".mp4" ? "video/mp4" :
      ext === ".webm" ? "video/webm" :
      ext === ".png" ? "image/png" :
      ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
      ext === ".webp" ? "image/webp" : "application/octet-stream"
    );

    // 1. Upload to Cloudflare R2
    if (ACCOUNT_ID && API_TOKEN && BUCKET_NAME) {
      try {
        await uploadToR2(r2Key, buffer, contentType);
        console.log(`[Upload] Uploaded ${r2Key} to R2`);

        // If it's a webm video, generate and upload companion iOS MP4
        if (ext === ".webm") {
          try {
            const ffmpegPath = require("ffmpeg-static");
            const tempDir = path.join(process.cwd(), "scratch");
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

            const tempWebm = path.join(tempDir, `tmp_${Date.now()}_${fileName}`);
            const tempMp4 = tempWebm.replace(/\.webm$/i, ".mp4");
            fs.writeFileSync(tempWebm, buffer);

            const args = [
              "-y",
              "-i", tempWebm,
              "-c:v", "libx264",
              "-preset", "fast",
              "-crf", "24",
              "-pix_fmt", "yuv420p",
              "-profile:v", "main",
              "-c:a", "aac",
              "-b:a", "128k",
              "-movflags", "+faststart",
              tempMp4,
            ];

            const conv = spawnSync(ffmpegPath, args);
            if (conv.status === 0 && fs.existsSync(tempMp4)) {
              const mp4Buffer = fs.readFileSync(tempMp4);
              const mp4Key = `${folder}/${cleanBaseName}.mp4`;
              await uploadToR2(mp4Key, mp4Buffer, "video/mp4");
              console.log(`[Upload] Also generated & uploaded iOS companion MP4: ${mp4Key}`);
              fs.unlinkSync(tempMp4);
            }
            if (fs.existsSync(tempWebm)) fs.unlinkSync(tempWebm);
          } catch (convErr) {
            console.warn("Companion MP4 generation notice:", convErr);
          }
        }

        const publicUrl = `${R2_PUBLIC_URL}/${encodeURI(r2Key)}`;
        return NextResponse.json({ url: publicUrl, key: r2Key, fileName });
      } catch (r2Error: any) {
        console.error("Cloudflare R2 Direct Upload Error:", r2Error);
      }
    }

    // 2. Fallback: local public folder
    const targetDir = path.join(process.cwd(), "public", folder);
    await mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/${folder}/${encodeURI(fileName)}`;
    return NextResponse.json({ url: publicUrl, key: r2Key, fileName });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
