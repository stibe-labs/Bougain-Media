import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { normalizeVideoSrc } from "@/lib/cms";

export async function GET() {
  try {
    const res = await query(
      "SELECT id, title, client, category, type, industry, result, description, image, video_src AS \"videoSrc\", aspect, span, featured, section, order_index FROM portfolio_items ORDER BY order_index ASC"
    );
    const rows = res.rows.map((row: any) => {
      const rawSrc = row.videoSrc || row.videosrc || row.video_src || undefined;
      const normalizedSrc = normalizeVideoSrc(rawSrc) || rawSrc;
      return {
        ...row,
        videoSrc: normalizedSrc,
      };
    });
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      title,
      client,
      category,
      type,
      industry,
      result,
      description,
      image,
      videoSrc,
      aspect,
      span,
      featured,
      section,
      order_index,
    } = body;

    const itemId = id || (title ? title.toLowerCase().replace(/[^a-z0-9]/g, "-") : `reel-${Date.now()}`);

    const sql = `
      INSERT INTO portfolio_items (id, title, client, category, type, industry, result, description, image, video_src, aspect, span, featured, section, order_index, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, now())
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        client = EXCLUDED.client,
        category = EXCLUDED.category,
        type = EXCLUDED.type,
        industry = EXCLUDED.industry,
        result = EXCLUDED.result,
        description = EXCLUDED.description,
        image = EXCLUDED.image,
        video_src = EXCLUDED.video_src,
        aspect = EXCLUDED.aspect,
        span = EXCLUDED.span,
        featured = EXCLUDED.featured,
        section = EXCLUDED.section,
        order_index = EXCLUDED.order_index,
        updated_at = now()
      RETURNING id, title, client, category, type, industry, result, description, image, video_src AS "videoSrc", aspect, span, featured, section, order_index;
    `;

    const res = await query(sql, [
      itemId,
      title || "",
      client || "",
      category || "All",
      type || "video",
      industry || "",
      result || "",
      description || "",
      image || "",
      videoSrc || null,
      aspect || "16:9",
      span || "md",
      featured || false,
      section || (videoSrc?.includes("/AI/") ? "ai-concept-ads" : "video-production"),
      order_index || 0,
    ]);

    return NextResponse.json(res.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll");

    if (clearAll === "true" || id === "all") {
      await query("DELETE FROM portfolio_items");
      return NextResponse.json({ success: true, message: "Deleted all portfolio items from database" });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await query("DELETE FROM portfolio_items WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
