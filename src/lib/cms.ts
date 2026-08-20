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

export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-41d833109b8d4143be9228b4d7510632.r2.dev";

// Upload file directly to Cloudflare R2 via /api/upload
export async function uploadMediaAsset(file: File, folder: string = "videos/Content Videos"): Promise<string> {
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

const aiVideoFiles = new Set([
  "AMRUTH CONCEPT AD",
  "EASTER VIDEO",
  "HAYYAK AD VIDEO",
  "HNA AD GST",
  "kitkat ad stibe final",
  "mango bite ad",
  "milma ad",
  "RAIHAT AL ZUHAR",
  "RAIHAT UDIYYA",
  "solar ad extrawatt",
  "TOMS PIPES CONCEPT AD",
  "TOMS PIPES METEOR AD",
  "toms pipes",
  "UDDIYA RAIHAT AL ZUHAR",
  "UDIYYA ad raihat",
]);

// Map clean / lowercase / legacy paths to proper R2 asset paths
const cleanVideoMap: Record<string, string> = {
  "turn-up-crown-plaza.webm": "videos/Content Videos/turn-up-crown-plaza.webm",
  "boss-reel-final.webm": "videos/Content Videos/boss-reel-final.webm",
  "chefs-kiss-final-out.webm": "videos/Content Videos/chefs-kiss-final-out.webm",
  "first-draft-emarath.webm": "videos/Content Videos/first-draft-emarath.webm",
  "got-emarath-1.webm": "videos/Content Videos/got-emarath-1.webm",
  "fit-co-reel-1.webm": "videos/Content Videos/fit-co-reel-1.webm",
  "godha-reel-final.webm": "videos/Content Videos/godha-reel-final.webm",
  "happy-2.webm": "videos/Content Videos/happy-2.webm",
  "aicademy-new-reel.webm": "videos/Content Videos/aicademy-new-reel.webm",
  "getwork-vid-fdraft-2.webm": "videos/Content Videos/aicademy-new-reel.webm",
  "emarath-interior-draft-preview.webm": "videos/Content Videos/emarath-interior-draft-preview.webm",
  "gwnad.webm": "videos/Content Videos/gwnad.webm",
  "keyboard-reel-final-draftt.webm": "videos/Content Videos/keyboard-reel-final-draftt.webm",
  "mango-bite-ad.webm": "videos/Content Videos/mango-bite-ad.webm",
  "revathy-reel-1draft.webm": "videos/Content Videos/revathy-reel-1draft.webm",
  "solar-ad-extrawatt.webm": "videos/Content Videos/solar-ad-extrawatt.webm",
  "toms-pipes-concept-ad.webm": "videos/Content Videos/toms-pipes-concept-ad.webm",
  "toms-pipes.webm": "videos/Content Videos/toms-pipes.webm",
  "udiyya-ad-raihat.webm": "videos/Content Videos/udiyya-ad-raihat.webm",
  "v-3.webm": "videos/Content Videos/v-3.webm",
  "v2.webm": "videos/Content Videos/v2.webm",
  "v3-raw-a.webm": "videos/Content Videos/v3-raw-a.webm",
  "v4-cut.webm": "videos/Content Videos/v4-cut.webm",
  "v6.webm": "videos/Content Videos/v6.webm",
  "v7-a.webm": "videos/Content Videos/v7-a.webm",
  "vc-1.webm": "videos/Content Videos/vc-1.webm",

  // AI concept ads
  "amruth-concept-ad.webm": "videos/Bougain AI videos/AMRUTH CONCEPT AD.webm",
  "easter-video.webm": "videos/Bougain AI videos/EASTER VIDEO.webm",
  "hayyak-ad-video.webm": "videos/Bougain AI videos/HAYYAK AD VIDEO.webm",
  "hna-ad-gst.webm": "videos/Bougain AI videos/HNA AD GST.webm",
  "kitkat-ad-stibe-final.webm": "videos/Bougain AI videos/kitkat ad stibe final.webm",
  "milma-ad.webm": "videos/Bougain AI videos/milma ad.webm",
  "raihat-al-zuhar.webm": "videos/Bougain AI videos/RAIHAT AL ZUHAR.webm",
  "raihat-udiyya.webm": "videos/Bougain AI videos/RAIHAT UDIYYA.webm",
  "toms-pipes-meteor-ad.webm": "videos/Bougain AI videos/TOMS PIPES METEOR AD.webm",
  "uddiya-raihat-al-zuhar.webm": "videos/Bougain AI videos/UDDIYA RAIHAT AL ZUHAR.webm",
};

/**
 * Normalizes any video path (relative, local, legacy, or R2) to a canonical R2 public URL
 */
export function normalizeVideoSrc(src?: string | null): string | undefined {
  if (!src) return undefined;

  let clean = decodeURIComponent(src.split("#")[0].trim());

  // If already a full public R2 URL or external URL, return encoded version
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }

  // Remove leading slashes
  clean = clean.replace(/^\/+/, "");

  // If it matches a known alias in cleanVideoMap
  const fileName = clean.split("/").pop() || "";
  if (cleanVideoMap[fileName]) {
    return `${R2_PUBLIC_URL}/${encodeURI(cleanVideoMap[fileName])}`;
  }

  // If already has folder path
  if (clean.startsWith("videos/")) {
    return `${R2_PUBLIC_URL}/${encodeURI(clean)}`;
  }

  // Check if AI video
  const baseName = fileName.replace(/\.(webm|mp4)$/i, "");
  if (aiVideoFiles.has(baseName)) {
    return `${R2_PUBLIC_URL}/${encodeURI(`videos/Bougain AI videos/${fileName}`)}`;
  }

  // Default to Content Videos
  return `${R2_PUBLIC_URL}/${encodeURI(`videos/Content Videos/${fileName}`)}`;
}

/**
 * Returns dual video source URLs (MP4 for iOS / Safari, WebM for Android / Chrome / Desktop)
 */
export function getVideoSources(src?: string | null): { mp4: string; webm: string } | null {
  if (!src) return null;
  const normalized = normalizeVideoSrc(src) || src;

  // Derive MP4 and WebM variants
  const mp4 = normalized.replace(/\.(webm|mp4)$/i, ".mp4");
  const webm = normalized.replace(/\.(webm|mp4)$/i, ".webm");

  return { mp4, webm };
}

// Fetch Portfolio Items from Postgres API (or fallback to constants)
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
        section: item.section || (
          (normalizedSrc || "").toLowerCase().includes("ai") ? "ai-concept-ads" : "content-videos"
        ),
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
