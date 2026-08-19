import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET;
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-41d833109b8d4143be9228b4d7510632.r2.dev";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "videos";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "webm";
    const cleanName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, "-");
    const fileName = `${Date.now()}-${cleanName}`;

    // Try uploading to Cloudflare R2 Bucket via Cloudflare API
    if (ACCOUNT_ID && API_TOKEN && BUCKET_NAME) {
      try {
        const uploadUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${encodeURIComponent(fileName)}`;
        const r2Res = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": file.type || "video/webm",
          },
          body: buffer,
        });

        if (r2Res.ok) {
          const publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
          return NextResponse.json({ url: publicUrl });
        }
      } catch (r2Error) {
        console.error("Cloudflare R2 Direct Upload Error:", r2Error);
      }
    }

    // Fallback: local public folder
    const safeFolderName = folder === "images" ? "images" : "videos";
    const targetDir = path.join(process.cwd(), "public", safeFolderName);

    await mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/${safeFolderName}/${fileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
