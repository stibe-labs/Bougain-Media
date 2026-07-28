import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { portfolio, services, hero, contact } from "@/lib/constants";

export async function POST() {
  try {
    const validIds = portfolio.items.map((i) => i.id);

    // 1. Remove stale portfolio items not present in current constants
    if (validIds.length > 0) {
      const placeholders = validIds.map((_, i) => `$${i + 1}`).join(",");
      await query(`DELETE FROM portfolio_items WHERE id NOT IN (${placeholders})`, validIds);
    }

    // 2. Seed / Upsert Portfolio Items
    for (let index = 0; index < portfolio.items.length; index++) {
      const item = portfolio.items[index];
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
          updated_at = now();
      `;
      await query(sql, [
        item.id,
        item.title,
        item.client,
        item.category,
        item.type,
        item.industry,
        item.result,
        item.description,
        item.image,
        item.videoSrc || null,
        item.aspect || "16:9",
        item.span || "md",
        item.featured || false,
        item.section || (item.videoSrc?.includes("/AI/") ? "ai-concept-ads" : "video-production"),
        index,
      ]);
    }

    // 3. Seed Services
    for (let index = 0; index < services.items.length; index++) {
      const item = services.items[index];
      const id = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const sql = `
        INSERT INTO services (id, title, description, tag, image, features, stats, order_index, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8, now())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          tag = EXCLUDED.tag,
          image = EXCLUDED.image,
          features = EXCLUDED.features,
          stats = EXCLUDED.stats,
          order_index = EXCLUDED.order_index,
          updated_at = now();
      `;
      await query(sql, [
        id,
        item.title,
        item.description,
        item.tag,
        item.image,
        JSON.stringify(item.features || []),
        JSON.stringify(item.stats || []),
        index,
      ]);
    }

    // 4. Seed Site Settings
    await query(
      "INSERT INTO site_settings (key, value, updated_at) VALUES ('hero', $1::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
      [JSON.stringify(hero)]
    );
    await query(
      "INSERT INTO site_settings (key, value, updated_at) VALUES ('contact', $1::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
      [JSON.stringify(contact)]
    );

    return NextResponse.json({ success: true, message: "PostgreSQL database synced successfully with WebM videos!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to sync database" }, { status: 500 });
  }
}
