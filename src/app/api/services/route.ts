import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query(
      "SELECT id, title, description, tag, image, video, features, stats, order_index FROM services ORDER BY order_index ASC"
    );
    return NextResponse.json(res.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, tag, image, video, features, stats, order_index } = body;

    const itemId = id || title.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const sql = `
      INSERT INTO services (id, title, description, tag, image, video, features, stats, order_index, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb, $9, now())
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        tag = EXCLUDED.tag,
        image = EXCLUDED.image,
        video = EXCLUDED.video,
        features = EXCLUDED.features,
        stats = EXCLUDED.stats,
        order_index = EXCLUDED.order_index,
        updated_at = now()
      RETURNING id, title, description, tag, image, video, features, stats, order_index;
    `;

    const res = await query(sql, [
      itemId,
      title,
      description,
      tag,
      image,
      video || null,
      JSON.stringify(features || []),
      JSON.stringify(stats || []),
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
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await query("DELETE FROM services WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
