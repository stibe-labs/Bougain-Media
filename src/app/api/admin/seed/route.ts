import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { portfolio, services, hero, contact } from "@/lib/constants";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Seed Portfolio Items
    const portfolioPayload = portfolio.items.map((item, index) => ({
      id: item.id,
      title: item.title,
      client: item.client,
      category: item.category,
      type: item.type,
      industry: item.industry,
      result: item.result,
      description: item.description,
      image: item.image,
      video_src: item.videoSrc || null,
      aspect: item.aspect || "16:9",
      span: item.span || "md",
      featured: item.featured || false,
      order_index: index,
    }));

    const { error: portfolioError } = await supabase
      .from("portfolio_items")
      .upsert(portfolioPayload, { onConflict: "id" });

    if (portfolioError) throw portfolioError;

    // 2. Seed Services
    const servicesPayload = services.items.map((item, index) => ({
      id: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: item.title,
      description: item.description,
      tag: item.tag,
      image: item.image,
      features: item.features,
      stats: item.stats,
      order_index: index,
    }));

    const { error: servicesError } = await supabase
      .from("services")
      .upsert(servicesPayload, { onConflict: "id" });

    if (servicesError) throw servicesError;

    // 3. Seed Site Settings
    await supabase.from("site_settings").upsert(
      [
        { key: "hero", value: hero },
        { key: "contact", value: contact },
      ],
      { onConflict: "key" }
    );

    return NextResponse.json({ success: true, message: "Database seeded successfully!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to seed database" }, { status: 500 });
  }
}
