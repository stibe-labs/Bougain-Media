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
  "TURN UP CROWN PLAZA.webm": "/videos/AI/turn-up-crown-plaza.webm",
  "TURN UP CROWN PLAZA.mp4": "/videos/AI/turn-up-crown-plaza.webm",
  "BOSS REEL_FINAL.webm": "/videos/AI/boss-reel-final.webm",
  "BOSS REEL_FINAL.mp4": "/videos/AI/boss-reel-final.webm",
  "chefs kiss_FINAL OUT.webm": "/videos/AI/chefs-kiss-final-out.webm",
  "chefs kiss_FINAL OUT.mp4": "/videos/AI/chefs-kiss-final-out.webm",
  "first draft emarath.webm": "/videos/AI/first-draft-emarath.webm",
  "first draft emarath.mp4": "/videos/AI/first-draft-emarath.webm",
  "GOT emarath_1.webm": "/videos/AI/got-emarath-1.webm",
  "GOT emarath_1.mp4": "/videos/AI/got-emarath-1.webm",
  "Fit&Co Reel 1.webm": "/videos/AI/fit-co-reel-1.webm",
  "Fit&Co Reel 1.mp4": "/videos/AI/fit-co-reel-1.webm",
  "godha reel final.webm": "/videos/AI/godha-reel-final.webm",
  "godha reel final.mp4": "/videos/AI/godha-reel-final.webm",
  "HAPPY_2.webm": "/videos/AI/happy-2.webm",
  "HAPPY_2.mp4": "/videos/AI/happy-2.webm",
  "Aicademy New Reel.webm": "/videos/AI/aicademy-new-reel.webm",
  "Aicademy New Reel.mp4": "/videos/AI/aicademy-new-reel.webm",
  "Getwork Vid Fdraft 2.webm": "/videos/AI/getwork-vid-fdraft-2.webm",
  "Getwork Vid Fdraft 2.mp4": "/videos/AI/getwork-vid-fdraft-2.webm",
  "Emarath Interior Finalll Draft_preview.webm": "/videos/AI/emarath-interior-draft-preview.webm",
  "Emarath Interior Finalll Draft_preview.mp4": "/videos/AI/emarath-interior-draft-preview.webm",
  "Gwnad.webm": "/videos/AI/gwnad.webm",
  "Gwnad.mp4": "/videos/AI/gwnad.webm",
  "keyboard reel final draftt.webm": "/videos/AI/keyboard-reel-final-draftt.webm",
  "keyboard reel final draftt.mp4": "/videos/AI/keyboard-reel-final-draftt.webm",
  "R2V2.webm": "/videos/AI/r2v2.webm",
  "R2V2.mp4": "/videos/AI/r2v2.webm",
  "REEL 2 FitGo.webm": "/videos/AI/reel-2-fitgo.webm",
  "REEL 2 FitGo.mp4": "/videos/AI/reel-2-fitgo.webm",
  "Revathy Reel 1Draft.webm": "/videos/AI/revathy-reel-1draft.webm",
  "Revathy Reel 1Draft.mp4": "/videos/AI/revathy-reel-1draft.webm",
  "V 3.webm": "/videos/AI/v-3.webm",
  "V 3.mp4": "/videos/AI/v-3.webm",
  "V 4.webm": "/videos/AI/v-4.webm",
  "V 4.mp4": "/videos/AI/v-4.webm",
  "V4.webm": "/videos/AI/v4-cut.webm",
  "V4.mov": "/videos/AI/v4-cut.webm",
  "v2.webm": "/videos/AI/v2.webm",
  "v2.mp4": "/videos/AI/v2.webm",
  "v3 raw A.webm": "/videos/AI/v3-raw-a.webm",
  "v3 raw A.mp4": "/videos/AI/v3-raw-a.webm",
  "v6.webm": "/videos/AI/v6.webm",
  "v6.mp4": "/videos/AI/v6.webm",
  "v7 a.webm": "/videos/AI/v7-a.webm",
  "v7 a.mp4": "/videos/AI/v7-a.webm",
  "vc 1.webm": "/videos/AI/vc-1.webm",
  "vc 1.mp4": "/videos/AI/vc-1.webm"
};

export function normalizeVideoSrc(src?: string | null): string | undefined {
  if (!src) return undefined;
  
  // 1. Remove fragment identifiers (e.g. #t=0.001)
  let clean = src.split("#")[0].trim();
  
  // 2. Extract filename and decode URI
  const rawFilename = clean.split("/").pop() || "";
  const decodedFilename = decodeURIComponent(rawFilename);
  
  // 3. Lookup in cleanVideoMap
  if (cleanVideoMap[rawFilename]) return cleanVideoMap[rawFilename];
  if (cleanVideoMap[decodedFilename]) return cleanVideoMap[decodedFilename];
  
  // 4. Ensure leading slash for any relative path
  if (!clean.startsWith("/") && !clean.startsWith("http://") && !clean.startsWith("https://")) {
    clean = "/" + clean;
  }
  
  return clean;
}

// Fetch Portfolio Items from Postgres API
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const res = await fetch("/api/portfolio", { cache: "no-store" });
    if (!res.ok) return portfolio.items;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return portfolio.items;

    return data.map((item: any) => {
      const rawSrc = item.videoSrc || item.video_src || undefined;
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
