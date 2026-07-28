import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

    const safeFolderName = folder === "images" ? "images" : "videos";
    const targetDir = path.join(process.cwd(), "public", safeFolderName);

    await mkdir(targetDir, { recursive: true });

    const ext = file.name.split(".").pop() || "mp4";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const filePath = path.join(targetDir, fileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/${safeFolderName}/${fileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
