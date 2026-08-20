import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import path from "path";
import fs from "fs";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET || "bougain-media-bucket";
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-41d833109b8d4143be9228b4d7510632.r2.dev";

async function copyAndDeleteR2Object(oldKey: string, newKey: string) {
  // 1. Get existing object from R2
  const getUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${encodeURIComponent(oldKey)}`;
  const getRes = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  if (!getRes.ok) {
    throw new Error(`Failed to fetch original file "${oldKey}" from R2 (status ${getRes.status})`);
  }

  const contentType = getRes.headers.get("content-type") || (
    newKey.endsWith(".mp4") ? "video/mp4" :
    newKey.endsWith(".webm") ? "video/webm" :
    newKey.endsWith(".png") ? "image/png" :
    newKey.endsWith(".jpg") || newKey.endsWith(".jpeg") ? "image/jpeg" :
    newKey.endsWith(".webp") ? "image/webp" : "application/octet-stream"
  );

  const fileBytes = await getRes.arrayBuffer();

  // 2. Put object to new key
  const putUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${encodeURIComponent(newKey)}`;
  const putRes = await fetch(putUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": contentType,
    },
    body: fileBytes,
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    throw new Error(`Failed to write new object "${newKey}" to R2: ${errText}`);
  }

  // 3. Delete old object
  const delRes = await fetch(getUrl, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  if (!delRes.ok) {
    console.warn(`Warning: Could not delete old key "${oldKey}" after copy:`, await delRes.text());
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { oldKey, newName, customNewKey } = body;

    if (!oldKey || (!newName && !customNewKey)) {
      return NextResponse.json(
        { error: "Missing required parameters: 'oldKey' and ('newName' or 'customNewKey')" },
        { status: 400 }
      );
    }

    const parts = oldKey.split("/");
    const oldFileName = parts.pop() || "";
    const folder = parts.join("/");

    // Clean new filename
    const cleanNewName = (newName || customNewKey.split("/").pop() || "").trim();
    if (!cleanNewName) {
      return NextResponse.json({ error: "Invalid new name" }, { status: 400 });
    }

    // Preserve extension if user didn't type it
    const oldExt = path.extname(oldFileName);
    const newExt = path.extname(cleanNewName);
    const finalNewFileName = newExt ? cleanNewName : `${cleanNewName}${oldExt}`;

    const newKey = folder ? `${folder}/${finalNewFileName}` : finalNewFileName;

    if (oldKey === newKey) {
      return NextResponse.json({ success: true, message: "No change", newKey, newPublicUrl: `${R2_PUBLIC_URL}/${encodeURI(newKey)}` });
    }

    console.log(`[R2 Rename] Renaming "${oldKey}" -> "${newKey}"...`);

    // 1. Rename primary object in R2
    await copyAndDeleteR2Object(oldKey, newKey);

    // 2. If it's a video (.webm or .mp4), check and rename companion format as well
    const isVideo = oldKey.endsWith(".webm") || oldKey.endsWith(".mp4");
    if (isVideo) {
      const baseOldName = oldFileName.replace(/\.(webm|mp4)$/i, "");
      const baseNewName = finalNewFileName.replace(/\.(webm|mp4)$/i, "");

      const oldCompanionExt = oldKey.endsWith(".webm") ? ".mp4" : ".webm";
      const newCompanionExt = oldKey.endsWith(".webm") ? ".mp4" : ".webm";

      const oldCompanionKey = folder ? `${folder}/${baseOldName}${oldCompanionExt}` : `${baseOldName}${oldCompanionExt}`;
      const newCompanionKey = folder ? `${folder}/${baseNewName}${newCompanionExt}` : `${baseNewName}${newCompanionExt}`;

      try {
        await copyAndDeleteR2Object(oldCompanionKey, newCompanionKey);
        console.log(`[R2 Rename] Also renamed companion format "${oldCompanionKey}" -> "${newCompanionKey}"`);
      } catch (companionErr: any) {
        console.log(`[R2 Rename] Companion format notice: ${companionErr.message}`);
      }
    }

    // 3. Rename local file on disk if exists
    try {
      const localOldPath = path.join(process.cwd(), "public", oldKey);
      const localNewPath = path.join(process.cwd(), "public", newKey);
      if (fs.existsSync(localOldPath)) {
        fs.renameSync(localOldPath, localNewPath);
      }

      if (isVideo) {
        const baseOldName = oldFileName.replace(/\.(webm|mp4)$/i, "");
        const baseNewName = finalNewFileName.replace(/\.(webm|mp4)$/i, "");
        const localOldCompanion = path.join(process.cwd(), "public", folder, `${baseOldName}.mp4`);
        const localNewCompanion = path.join(process.cwd(), "public", folder, `${baseNewName}.mp4`);
        if (fs.existsSync(localOldCompanion)) {
          fs.renameSync(localOldCompanion, localNewCompanion);
        }
      }
    } catch (localErr) {
      console.warn("Local filesystem rename notice:", localErr);
    }

    // 4. Update database records if PostgreSQL is connected
    try {
      const oldRawName = oldFileName.replace(/\.(webm|mp4)$/i, "");
      const newRawName = finalNewFileName.replace(/\.(webm|mp4)$/i, "");

      await query(
        `UPDATE portfolio_items 
         SET video_src = REPLACE(video_src, $1, $2),
             updated_at = now()
         WHERE video_src ILIKE $3`,
        [oldFileName, finalNewFileName, `%${oldRawName}%`]
      );

      await query(
        `UPDATE services 
         SET video = REPLACE(video, $1, $2),
             image = REPLACE(image, $1, $2),
             updated_at = now()
         WHERE video ILIKE $3 OR image ILIKE $3`,
        [oldFileName, finalNewFileName, `%${oldRawName}%`]
      );
    } catch (dbErr) {
      console.log("DB update notice (DB may not be running locally):", dbErr);
    }

    const newPublicUrl = `${R2_PUBLIC_URL}/${encodeURI(newKey)}`;

    return NextResponse.json({
      success: true,
      message: `Successfully renamed "${oldFileName}" to "${finalNewFileName}" across R2 and storage!`,
      oldKey,
      newKey,
      newName: finalNewFileName,
      publicUrl: newPublicUrl,
    });
  } catch (error: any) {
    console.error("POST /api/admin/media/rename error:", error);
    return NextResponse.json({ error: error.message || "Failed to rename media" }, { status: 500 });
  }
}
