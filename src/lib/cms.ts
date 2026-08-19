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
  "BOSS REEL_FINAL.webm": "/videos/AI/boss-reel-final.webm",
  "chefs kiss_FINAL OUT.webm": "/videos/AI/chefs-kiss-final-out.webm",
  "first draft emarath.webm": "/videos/AI/first-draft-emarath.webm",
  "GOT emarath_1.webm": "/videos/AI/got-emarath-1.webm",
  "Fit&Co Reel 1.webm": "/videos/AI/fit-co-reel-1.webm",
  "godha reel final.webm": "/videos/AI/godha-reel-final.webm",
  "HAPPY_2.webm": "/videos/AI/happy-2.webm",
  "Aicademy New Reel.webm": "/videos/AI/aicademy-new-reel.webm",
  "Getwork Vid Fdraft 2.webm": "/videos/AI/getwork-vid-fdraft-2.webm",
  "Emarath Interior Finalll Draft_preview.webm": "/videos/AI/emarath-interior-draft-preview.webm",
  "Gwnad.webm": "/videos/AI/gwnad.webm",
  "keyboard reel final draftt.webm": "/videos/AI/keyboard-reel-final-draftt.webm",
  "R2V2.webm": "/videos/AI/r2v2.webm",
  "REEL 2 FitGo.webm": "/videos/AI/reel-2-fitgo.webm",
  "Revathy Reel 1Draft.webm": "/videos/AI/revathy-reel-1draft.webm",
  "V 3.webm": "/videos/AI/v-3.webm",
  "V 4.webm": "/videos/AI/v-4.webm",
  "V4.webm": "/videos/AI/v4-cut.webm",
  "v2.webm": "/videos/AI/v2.webm",
  "v3 raw A.webm": "/videos/AI/v3-raw-a.webm",
  "v6.webm": "/videos/AI/v6.webm",
  "v7 a.webm": "/videos/AI/v7-a.webm",
  "vc 1.webm": "/videos/AI/vc-1.webm",
};

export function normalizeVideoSrc(src?: string | null): string | undefined {
  if (!src) return undefined;
  
  // 1. Remove fragment identifiers (e.g. #t=0.001) and decode URI components
  let clean = decodeURIComponent(src.split("#")[0].trim());
  
  // 2. Extract filename
  const filename = clean.split("/").pop() || "";
  
  // 3. Lookup in cleanVideoMap for legacy seeded filenames
  if (cleanVideoMap[filename]) {
    return cleanVideoMap[filename];
  }
  
  // 4. If path refers to legacy Content_video_webm folder, redirect to /videos/AI/
  if (clean.includes("/Content_video_webm/") || clean.includes("/Content video/") || clean.includes("/content/")) {
    const slug = filename.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const testPath = `/videos/AI/${slug}.webm`;
    return testPath;
  }
  
  // 5. Ensure leading slash for relative paths
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
