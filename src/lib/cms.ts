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

const cleanVideoMap: Record<string, string> = {
  "turn-up-crown-plaza.webm": "/videos/AI/AMRUTH%20CONCEPT%20AD.webm",
  "TURN UP CROWN PLAZA.webm": "/videos/AI/AMRUTH%20CONCEPT%20AD.webm",
  "boss-reel-final.webm": "/videos/AI/EASTER%20VIDEO.webm",
  "BOSS REEL_FINAL.webm": "/videos/AI/EASTER%20VIDEO.webm",
  "chefs-kiss-final-out.webm": "/videos/AI/HAYYAK%20AD%20VIDEO.webm",
  "chefs kiss_FINAL OUT.webm": "/videos/AI/HAYYAK%20AD%20VIDEO.webm",
  "first-draft-emarath.webm": "/videos/AI/HNA%20AD%20GST.webm",
  "first draft emarath.webm": "/videos/AI/HNA%20AD%20GST.webm",
  "got-emarath-1.webm": "/videos/AI/RAIHAT%20AL%20ZUHAR.webm",
  "GOT emarath_1.webm": "/videos/AI/RAIHAT%20AL%20ZUHAR.webm",
  "fit-co-reel-1.webm": "/videos/AI/RAIHAT%20UDIYYA.webm",
  "Fit&Co Reel 1.webm": "/videos/AI/RAIHAT%20UDIYYA.webm",
  "godha-reel-final.webm": "/videos/AI/TOMS%20PIPES%20CONCEPT%20AD.webm",
  "godha reel final.webm": "/videos/AI/TOMS%20PIPES%20CONCEPT%20AD.webm",
  "happy-2.webm": "/videos/AI/TOMS%20PIPES%20METEOR%20AD.webm",
  "HAPPY_2.webm": "/videos/AI/TOMS%20PIPES%20METEOR%20AD.webm",
  "aicademy-new-reel.webm": "/videos/AI/UDDIYA%20RAIHAT%20AL%20ZUHAR.webm",
  "Aicademy New Reel.webm": "/videos/AI/UDDIYA%20RAIHAT%20AL%20ZUHAR.webm",
  "getwork-vid-fdraft-2.webm": "/videos/AI/UDIYYA%20ad%20raihat.webm",
  "Getwork Vid Fdraft 2.webm": "/videos/AI/UDIYYA%20ad%20raihat.webm",
  "emarath-interior-draft-preview.webm": "/videos/AI/kitkat%20ad%20stibe%20final.webm",
  "Emarath Interior Finalll Draft_preview.webm": "/videos/AI/kitkat%20ad%20stibe%20final.webm",
  "gwnad.webm": "/videos/AI/mango%20bite%20ad.webm",
  "Gwnad.webm": "/videos/AI/mango%20bite%20ad.webm",
  "keyboard-reel-final-draftt.webm": "/videos/AI/milma%20ad.webm",
  "keyboard reel final draftt.webm": "/videos/AI/milma%20ad.webm",
  "r2v2.webm": "/videos/AI/solar%20ad%20extrawatt.webm",
  "R2V2.webm": "/videos/AI/solar%20ad%20extrawatt.webm",
  "reel-2-fitgo.webm": "/videos/AI/toms%20pipes.webm",
  "REEL 2 FitGo.webm": "/videos/AI/toms%20pipes.webm",
  "revathy-reel-1draft.webm": "/videos/AI/AMRUTH%20CONCEPT%20AD.webm",
  "Revathy Reel 1Draft.webm": "/videos/AI/AMRUTH%20CONCEPT%20AD.webm",
  "v-3.webm": "/videos/AI/EASTER%20VIDEO.webm",
  "V 3.webm": "/videos/AI/EASTER%20VIDEO.webm",
  "v-4.webm": "/videos/AI/HAYYAK%20AD%20VIDEO.webm",
  "V 4.webm": "/videos/AI/HAYYAK%20AD%20VIDEO.webm",
  "v4-cut.webm": "/videos/AI/HNA%20AD%20GST.webm",
  "V4.webm": "/videos/AI/HNA%20AD%20GST.webm",
  "v2.webm": "/videos/AI/RAIHAT%20AL%20ZUHAR.webm",
  "v3-raw-a.webm": "/videos/AI/RAIHAT%20UDIYYA.webm",
  "v3 raw A.webm": "/videos/AI/RAIHAT%20UDIYYA.webm",
  "v6.webm": "/videos/AI/TOMS%20PIPES%20CONCEPT%20AD.webm",
  "v7-a.webm": "/videos/AI/TOMS%20PIPES%20METEOR%20AD.webm",
  "v7 a.webm": "/videos/AI/TOMS%20PIPES%20METEOR%20AD.webm",
  "vc-1.webm": "/videos/AI/UDDIYA%20RAIHAT%20AL%20ZUHAR.webm",
  "vc 1.webm": "/videos/AI/UDDIYA%20RAIHAT%20AL%20ZUHAR.webm"
};

export function normalizeVideoSrc(src?: string | null): string | undefined {
  if (!src) return undefined;

  // 1. Remove fragment identifiers (e.g. #t=0.001) and decode URI components
  let clean = decodeURIComponent(src.split("#")[0].trim());

  // 2. Extract exact raw filename
  const rawFilename = clean.split("/").pop() || "";
  if (!rawFilename) return clean;

  // 3. Match against known clean lookup or compute clean hyphenated name
  if (cleanVideoMap[rawFilename]) return cleanVideoMap[rawFilename];

  return `/videos/AI/${encodeURIComponent(rawFilename)}`;
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
