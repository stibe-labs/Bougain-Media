"use client";

import { useState, useEffect } from "react";
import { getPortfolioItems, savePortfolioItem, deletePortfolioItem, uploadMediaAsset, normalizeVideoSrc } from "@/lib/cms";
import { PortfolioItem, portfolioCategories } from "@/lib/constants";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2,
  Play,
  RefreshCw,
  Film,
} from "lucide-react";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getPortfolioItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSyncDatabase = async () => {
    if (!confirm("This will sync the database with current WebM video collection. Proceed?")) return;
    setSyncing(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to sync");
      setMessage({ type: "success", text: "Database synced successfully! All 15 AI videos loaded." });
      await loadData();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Sync failed" });
    } finally {
      setSyncing(false);
    }
  };

  const handleCreateNew = () => {
    setEditingItem({
      id: `project-${Date.now()}`,
      title: "",
      client: "",
      category: portfolioCategories[0],
      type: "video",
      industry: "AI Concept",
      result: "",
      description: "",
      image: "",
      videoSrc: "",
      aspect: "16:9",
      span: "md",
      featured: false,
    });
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    try {
      const videoUrl = await uploadMediaAsset(file, "videos");
      setEditingItem((prev) => (prev ? { ...prev, videoSrc: videoUrl, type: "video" } : null));
      setMessage({ type: "success", text: "Video uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Video upload failed" });
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadMediaAsset(file, "images");
      setEditingItem((prev) => (prev ? { ...prev, image: imageUrl } : null));
      setMessage({ type: "success", text: "Thumbnail image uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Image upload failed" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSaving(true);
    setMessage(null);

    try {
      await savePortfolioItem(editingItem);

      setMessage({ type: "success", text: "Portfolio item saved successfully!" });
      setEditingItem(null);
      await loadData();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save item." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio project?")) return;

    try {
      await deletePortfolioItem(id);
      setMessage({ type: "success", text: "Project deleted." });
      await loadData();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to delete project." });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
            Portfolio & Video Reels
          </h1>
          <p className="mt-1 font-sans text-sm text-white/60">
            Upload new video reels, change thumbnails, and edit project details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncDatabase}
            disabled={syncing}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-sans text-xs font-bold text-white hover:bg-white/20 transition-all border border-white/15 disabled:opacity-50"
            title="Sync Database to load 15 AI videos"
          >
            <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
            Sync Database
          </button>

          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 rounded-xl bg-[#9BB09E] px-5 py-3 font-sans text-xs font-bold text-[#091E16] hover:bg-[#b0c7b3] transition-all"
          >
            <Plus size={16} />
            Add New Reel
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-2xl border p-4 font-sans text-sm ${
            message.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-rose-500/30 bg-rose-500/10 text-rose-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Item List / Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center text-white/50">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const rawSrc = normalizeVideoSrc(item.videoSrc) || item.videoSrc;
            const safeEncodeURI = (url: string) => {
              if (!url) return "";
              try {
                return encodeURI(decodeURIComponent(url));
              } catch {
                return encodeURI(url);
              }
            };
            const displayTitle = item.title || rawSrc?.split("/").pop()?.replace(/\.(webm|mp4)$/i, "") || "Untitled Reel";
            const encodedSrc = rawSrc ? safeEncodeURI(rawSrc) : "";
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-5 transition-all hover:border-[#9BB09E]/40"
              >
                {/* Media Preview Box */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/40">
                  {encodedSrc ? (
                    <video
                      ref={(el) => {
                        if (el) {
                          el.muted = true;
                          el.defaultMuted = true;
                          el.setAttribute("playsinline", "true");
                          el.setAttribute("webkit-playsinline", "true");
                          const p = el.play();
                          if (p !== undefined) p.catch(() => {});
                        }
                      }}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full object-cover"
                    >
                      <source src={encodedSrc} type="video/webm" />
                      <source src={encodedSrc} type="video/mp4" />
                    </video>
                  ) : item.image ? (
                    <img src={safeEncodeURI(item.image)} alt={displayTitle} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-forest-deep">
                      <Film size={24} className="text-white/20" />
                    </div>
                  )}

                  {item.featured && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#9BB09E] px-2.5 py-1 text-[10px] font-bold text-[#091E16] z-10 pointer-events-none">
                      Featured
                    </span>
                  )}
                </div>

                {/* Information */}
                <div className="mt-4 flex-1">
                  <span className="font-sans text-[11px] font-semibold text-[#9BB09E]">
                    {item.client ? `${item.client} • ` : ""}{item.category}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-white line-clamp-1">
                    {displayTitle}
                  </h3>
                  {item.description && (
                    <p className="mt-2 font-sans text-xs text-white/60 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.result && (
                    <p className="mt-3 font-sans text-[11px] font-semibold text-emerald-400">
                      Result: {item.result}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-sans text-[10px] font-medium text-white/40 uppercase tracking-wider">
                    Aspect: {item.aspect || "16:9"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0F3D2E] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-xl font-bold text-white">
                {editingItem.id ? "Edit Portfolio Project" : "New Portfolio Project"}
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                    placeholder="e.g. Easter Video Concept"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.client || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                    placeholder="e.g. Brand Client"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                    Category
                  </label>
                  <select
                    value={editingItem.category || portfolioCategories[0]}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                  >
                    {portfolioCategories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0F3D2E]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    value={editingItem.aspect || "16:9"}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, aspect: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                  >
                    <option value="16:9" className="bg-[#0F3D2E]">16:9 (Landscape)</option>
                    <option value="9:16" className="bg-[#0F3D2E]">9:16 (Vertical Reel)</option>
                    <option value="4:3" className="bg-[#0F3D2E]">4:3 (Standard)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={editingItem.industry || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                    placeholder="e.g. AI Concept"
                  />
                </div>
              </div>

              {/* Video File Upload Dropzone */}
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <label className="block font-sans text-xs font-semibold text-[#9BB09E] mb-2">
                  Upload / Re-upload Video Reel (.webm, .mp4)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="video/webm,video/mp4"
                    onChange={handleVideoUpload}
                    disabled={uploadingVideo}
                    className="block w-full font-sans text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-[#9BB09E] file:px-4 file:py-2 file:font-sans file:text-xs file:font-bold file:text-[#091E16] hover:file:bg-[#b0c7b3]"
                  />
                  {uploadingVideo && <Loader2 className="animate-spin text-[#9BB09E]" size={20} />}
                </div>
                {editingItem.videoSrc && (
                  <p className="mt-2 text-[11px] text-emerald-400 truncate">
                    Current Video: {editingItem.videoSrc}
                  </p>
                )}
              </div>

              {/* Thumbnail Image Upload Dropzone */}
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                  Upload / Re-upload Thumbnail Image (.png, .webp)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="block w-full font-sans text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-white/20 file:px-4 file:py-2 file:font-sans file:text-xs file:font-bold file:text-white hover:file:bg-white/30"
                  />
                  {uploadingImage && <Loader2 className="animate-spin text-white" size={20} />}
                </div>
                {editingItem.image && (
                  <p className="mt-2 text-[11px] text-white/50 truncate">
                    Current Thumbnail: {editingItem.image}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="rounded-xl px-5 py-2.5 font-sans text-xs font-semibold text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-[#9BB09E] px-6 py-2.5 font-sans text-xs font-bold text-[#091E16] hover:bg-[#b0c7b3] disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                  Save Portfolio Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
