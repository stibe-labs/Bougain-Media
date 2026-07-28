import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query(
      "SELECT * FROM careers ORDER BY created_at DESC"
    );
    return NextResponse.json(res.rows);
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
      slug,
      department,
      location,
      employment_type,
      experience_level,
      description,
      responsibilities,
      requirements,
      salary_range,
      status,
    } = body;

    const jobSlug = slug || title.toLowerCase().replace(/[^a-z0-9]/g, "-");

    if (id) {
      const sql = `
        UPDATE careers SET
          title = $1,
          slug = $2,
          department = $3,
          location = $4,
          employment_type = $5,
          experience_level = $6,
          description = $7,
          responsibilities = $8,
          requirements = $9,
          salary_range = $10,
          status = $11,
          updated_at = now()
        WHERE id = $12
        RETURNING *;
      `;
      const res = await query(sql, [
        title,
        jobSlug,
        department,
        location,
        employment_type,
        experience_level,
        description,
        responsibilities || [],
        requirements || [],
        salary_range,
        status || "draft",
        id,
      ]);
      return NextResponse.json(res.rows[0]);
    } else {
      const sql = `
        INSERT INTO careers (title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements, salary_range, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
      `;
      const res = await query(sql, [
        title,
        jobSlug,
        department,
        location,
        employment_type,
        experience_level,
        description,
        responsibilities || [],
        requirements || [],
        salary_range,
        status || "draft",
      ]);
      return NextResponse.json(res.rows[0]);
    }
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

    await query("DELETE FROM careers WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
