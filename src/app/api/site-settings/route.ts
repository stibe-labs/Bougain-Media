import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      const res = await query("SELECT value FROM site_settings WHERE key = $1", [key]);
      if (res.rows.length > 0) {
        return NextResponse.json(res.rows[0].value);
      }
      return NextResponse.json(null);
    }

    const res = await query("SELECT key, value FROM site_settings");
    return NextResponse.json(res.rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || !value) {
      return NextResponse.json({ error: "Missing key or value" }, { status: 400 });
    }

    const sql = `
      INSERT INTO site_settings (key, value, updated_at)
      VALUES ($1, $2::jsonb, now())
      ON CONFLICT (key) DO UPDATE SET
        value = EXCLUDED.value,
        updated_at = now()
      RETURNING *;
    `;

    const res = await query(sql, [key, JSON.stringify(value)]);
    return NextResponse.json(res.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
