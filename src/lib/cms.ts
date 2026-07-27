import { createClient } from "@/lib/supabase/client";
import { portfolio, services as defaultServices, hero as defaultHero, contact as defaultContact, PortfolioItem } from "@/lib/constants";

export interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  tag: string;
  image: string;
  video?: string;
  features: string[];
  stats: { value: string; label: string }[];
}

// Upload file to Supabase Storage ('media' bucket)
export async function uploadMediaAsset(file: File, folder: "videos" | "images" | "services" = "videos"): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  const { data, error } = await supabase.storage.from("media").upload(fileName, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(data.path);
  return publicUrlData.publicUrl;
}

// Fetch Portfolio Items
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return portfolio.items;
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      client: item.client,
      category: item.category,
      type: item.type,
      industry: item.industry,
      result: item.result,
      description: item.description,
      image: item.image,
      videoSrc: item.video_src || undefined,
      aspect: item.aspect || "16:9",
      span: item.span || "md",
      featured: Boolean(item.featured),
    }));
  } catch {
    return portfolio.items;
  }
}

// Fetch Services
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultServices.items;
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      tag: item.tag,
      image: item.image,
      video: item.video || undefined,
      features: Array.isArray(item.features) ? item.features : [],
      stats: Array.isArray(item.stats) ? item.stats : [],
    }));
  } catch {
    return defaultServices.items;
  }
}

// Fetch Site Settings (Hero, Contact, Captions, etc.)
export async function getSiteSettings(key: string): Promise<any> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .single();

    if (error || !data) {
      if (key === "hero") return defaultHero;
      if (key === "contact") return defaultContact;
      return null;
    }

    return data.value;
  } catch {
    if (key === "hero") return defaultHero;
    if (key === "contact") return defaultContact;
    return null;
  }
}
