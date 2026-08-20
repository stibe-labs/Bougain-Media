import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET || "bougain-media-bucket";
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-41d833109b8d4143be9228b4d7510632.r2.dev";

export interface R2MediaItem {
  key: string;
  name: string;
  folder: string;
  size: number;
  contentType: string;
  publicUrl: string;
  lastModified: string;
  hasMp4?: boolean;
  hasWebm?: boolean;
}

// GET /api/admin/media — List all media from R2 bucket
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folderFilter = searchParams.get("folder"); // e.g. "Bougain AI videos" or "Content Videos" or "images"

    let cursor: string | undefined = undefined;
    const items: R2MediaItem[] = [];

    do {
      let listUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects`;
      if (cursor) {
        listUrl += `?cursor=${encodeURIComponent(cursor)}`;
      }

      const res = await fetch(listUrl, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        cache: "no-store",
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`R2 list failed: [${res.status}] ${err}`);
      }

      const data = await res.json();
      const objects = data.result || [];

      for (const obj of objects) {
        const key = obj.key || "";
        if (!key) continue;

        const parts = key.split("/");
        const fileName = parts.pop() || "";
        const folder = parts.join("/") || "root";

        if (folderFilter && folderFilter !== "all" && !folder.toLowerCase().includes(folderFilter.toLowerCase())) {
          continue;
        }

        const contentType = obj.http_metadata?.contentType || (
          fileName.endsWith(".mp4") ? "video/mp4" :
          fileName.endsWith(".webm") ? "video/webm" :
          fileName.endsWith(".png") ? "image/png" :
          fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") ? "image/jpeg" :
          fileName.endsWith(".webp") ? "image/webp" : "application/octet-stream"
        );

        items.push({
          key,
          name: fileName,
          folder,
          size: obj.size || 0,
          contentType,
          publicUrl: `${R2_PUBLIC_URL}/${encodeURI(key)}`,
          lastModified: obj.last_modified || new Date().toISOString(),
        });
      }

      cursor = data.result_info?.is_truncated ? data.result_info?.cursor : undefined;
    } while (cursor);

    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("GET /api/admin/media error:", error);
    return NextResponse.json({ error: error.message || "Failed to list media" }, { status: 500 });
  }
}

// DELETE /api/admin/media — Delete object from R2 and local storage
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Missing 'key' parameter" }, { status: 400 });
    }

    // 1. Delete from R2
    const delUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${encodeURIComponent(key)}`;
    const r2Res = await fetch(delUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });

    if (!r2Res.ok) {
      const err = await r2Res.text();
      console.warn(`R2 delete warning for ${key}:`, err);
    }

    // Also delete companion format if video (.webm <-> .mp4)
    if (key.endsWith(".webm") || key.endsWith(".mp4")) {
      const companionKey = key.endsWith(".webm")
        ? key.replace(/\.webm$/i, ".mp4")
        : key.replace(/\.mp4$/i, ".webm");

      const compUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${encodeURIComponent(companionKey)}`;
      await fetch(compUrl, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      }).catch(() => {});
    }

    // 2. Delete local file if present
    try {
      const localPath = path.join(process.cwd(), "public", key);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
    } catch {}

    return NextResponse.json({ success: true, message: `Deleted ${key} from R2` });
  } catch (error: any) {
    console.error("DELETE /api/admin/media error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete media" }, { status: 500 });
  }
}
