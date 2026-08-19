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

// Upload file locally to public directory via /api/upload
export async function uploadMediaAsset(file: File, folder: "videos" | "images" | "services" = "videos"): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Upload failed");
  }

  const data = await res.json();
  return data.url;
}

const cleanVideoFilenameMap: Record<string, string> = {
  "TURN UP CROWN PLAZA.webm": "turn-up-crown-plaza.webm",
  "BOSS REEL_FINAL.webm": "boss-reel-final.webm",
  "chefs kiss_FINAL OUT.webm": "chefs-kiss-final-out.webm",
  "first draft emarath.webm": "first-draft-emarath.webm",
  "GOT emarath_1.webm": "got-emarath-1.webm",
  "Fit&Co Reel 1.webm": "fit-co-reel-1.webm",
  "godha reel final.webm": "godha-reel-final.webm",
  "HAPPY_2.webm": "happy-2.webm",
  "Aicademy New Reel.webm": "aicademy-new-reel.webm",
  "Getwork Vid Fdraft 2.webm": "getwork-vid-fdraft-2.webm",
  "Emarath Interior Finalll Draft_preview.webm": "emarath-interior-finalll-draft-preview.webm",
  "Gwnad.webm": "gwnad.webm",
  "keyboard reel final draftt.webm": "keyboard-reel-final-draftt.webm",
  "R2V2.webm": "r2v2.webm",
  "REEL 2 FitGo.webm": "reel-2-fitgo.webm",
  "Revathy Reel 1Draft.webm": "revathy-reel-1draft.webm",
  "V 3.webm": "v-3.webm",
  "V 4.webm": "v-4.webm",
  "V4.webm": "v4-cut.webm",
  "v2.webm": "v2.webm",
  "v3 raw A.webm": "v3-raw-a.webm",
  "v6.webm": "v6.webm",
  "v7 a.webm": "v7-a.webm",
  "vc 1.webm": "vc-1.webm",
  "AMRUTH CONCEPT AD.webm": "amruth-concept-ad.webm",
  "EASTER VIDEO.webm": "easter-video.webm",
  "HAYYAK AD VIDEO.webm": "hayyak-ad-video.webm",
  "HNA AD GST.webm": "hna-ad-gst.webm",
  "kitkat ad stibe final.webm": "kitkat-ad-stibe-final.webm",
  "mango bite ad.webm": "mango-bite-ad.webm",
  "milma ad.webm": "milma-ad.webm",
  "RAIHAT AL ZUHAR.webm": "raihat-al-zuhar.webm",
  "RAIHAT UDIYYA.webm": "raihat-udiyya.webm",
  "solar ad extrawatt.webm": "solar-ad-extrawatt.webm",
  "TOMS PIPES CONCEPT AD.webm": "toms-pipes-concept-ad.webm",
  "TOMS PIPES METEOR AD.webm": "toms-pipes-meteor-ad.webm",
  "toms pipes.webm": "toms-pipes.webm",
  "UDDIYA RAIHAT AL ZUHAR.webm": "uddiya-raihat-al-zuhar.webm",
  "UDIYYA ad raihat.webm": "udiyya-ad-raihat.webm"
};

const R2_DOMAIN = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-41d833109b8d4143be9228b4d7510632.r2.dev";

export function normalizeVideoSrc(src?: string | null): string | undefined {
  if (!src) return undefined;

  // 1. Remove fragment identifiers (e.g. #t=0.001) and decode URI components
  let clean = decodeURIComponent(src.split("#")[0].trim());

  // 2. Extract exact raw filename
  const rawFilename = clean.split("/").pop() || "";
  if (!rawFilename) return clean;

  // 3. Match against known clean lookup or compute clean hyphenated name
  const cleanFilename = cleanVideoFilenameMap[rawFilename] || 
    rawFilename.toLowerCase().replace(/%20/g, "-").replace(/ /g, "-").replace(/_/g, "-").replace(/&/g, "-");

  // 4. Return high-performance Cloudflare R2 CDN URL
  return `${R2_DOMAIN}/${cleanFilename}`;
}

// Fetch Portfolio Items from Postgres API
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    if (!res.ok) return portfolio.items;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return portfolio.items;

    return data.map((item: any) => {
      const rawSrc = item.videoSrc || item.video_src || item.videosrc || undefined;
      const normalizedSrc = normalizeVideoSrc(rawSrc) || rawSrc;
      return {
        id: item.id,
        title: item.title || "",
        client: item.client || "",
        category: item.category || "All",
        type: item.type || "video",
        industry: item.industry || "",
        result: item.result || "",
        description: item.description || "",
        image: item.image || "",
        videoSrc: normalizedSrc,
        aspect: item.aspect || "16:9",
        span: item.span || "md",
        featured: Boolean(item.featured),
        section: item.section || ((normalizedSrc || "").includes("/AI/") ? "ai-concept-ads" : "content-videos"),
      };
    });
  } catch {
    return portfolio.items;
  }
}

// Save or Update Portfolio Item
export async function savePortfolioItem(item: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const res = await fetch("/api/portfolio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save portfolio item");
  }

  return await res.json();
}

// Delete Portfolio Item
export async function deletePortfolioItem(id: string): Promise<void> {
  const res = await fetch(`/api/portfolio?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete portfolio item");
  }
}

// Fetch Services from Postgres API
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch("/api/services", { cache: "no-store" });
    if (!res.ok) return defaultServices.items;
    const data = await res.json();
    if (!data || data.length === 0) return defaultServices.items;

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

// Save or Update Service Item
export async function saveServiceItem(item: Partial<ServiceItem>): Promise<ServiceItem> {
  const res = await fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save service");
  }

  return await res.json();
}

// Delete Service Item
export async function deleteServiceItem(id: string): Promise<void> {
  const res = await fetch(`/api/services?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete service");
  }
}

// Fetch Site Settings
export async function getSiteSettings(key: string): Promise<any> {
  if (key === "hero") return defaultHero;
  if (key === "contact") return defaultContact;
  return null;
}
