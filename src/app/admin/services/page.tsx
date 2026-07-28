"use client";

import { useState, useEffect } from "react";
import { getServices, saveServiceItem, uploadMediaAsset, ServiceItem } from "@/lib/cms";
import { Loader2, Plus, Edit2, Trash2, Check, X, Upload, Layers } from "lucide-react";

export default function AdminServicesPage() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getServices();
    setServicesList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    try {
      const isVideo = file.type.startsWith("video/");
      const url = await uploadMediaAsset(file, "services");

      setEditingService((prev) =>
        prev
          ? isVideo
            ? { ...prev, video: url }
            : { ...prev, image: url }
          : null
      );
      setMessage({ type: "success", text: "Media uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Upload failed." });
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) {
      alert("Service title is required.");
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      await saveServiceItem(editingService);

      setMessage({ type: "success", text: "Service updated successfully!" });
      setEditingService(null);
      await loadData();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save service." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
            Services & Practice Media
          </h1>
          <p className="mt-1 font-sans text-sm text-white/60">
            Customize service offerings, change cover imagery/videos, feature bullet points, and metrics.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingService({
              title: "",
              description: "",
              tag: "Creative",
              image: "/images/sevices/content creation.png",
              features: ["Feature line 1", "Feature line 2"],
              stats: [{ value: "100+", label: "Projects" }],
            })
          }
          className="flex items-center gap-2 rounded-xl bg-[#9BB09E] px-5 py-3 font-sans text-xs font-bold text-[#091E16] hover:bg-[#b0c7b3] transition-all"
        >
          <Plus size={16} />
          Add Service
        </button>
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

      {loading ? (
        <div className="flex h-64 items-center justify-center text-white/50">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((svc) => (
            <div
              key={svc.title}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-6 transition-all hover:border-[#9BB09E]/40"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/40">
                  {svc.video ? (
                    <video src={svc.video} muted loop playsInline className="h-full w-full object-cover" />
                  ) : (
                    <img src={svc.image} alt={svc.title} className="h-full w-full object-cover" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-sans text-[10px] font-bold text-[#9BB09E] backdrop-blur-sm">
                    {svc.tag}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-white">{svc.title}</h3>
                <p className="mt-2 font-sans text-xs text-white/60 leading-relaxed line-clamp-3">
                  {svc.description}
                </p>

                <div className="mt-4 space-y-1">
                  {svc.features?.slice(0, 3).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-sans text-[11px] text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9BB09E]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-sans text-xs font-semibold text-[#9BB09E]">
                  {svc.stats?.[0]?.value || "100+"} {svc.stats?.[0]?.label || ""}
                </span>
                <button
                  onClick={() => setEditingService(svc)}
                  className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 font-sans text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Edit2 size={13} />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0F3D2E] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-xl font-bold text-white">
                Customize Service Offering
              </h2>
              <button
                onClick={() => setEditingService(null)}
                className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ""}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                    placeholder="Content Creation"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                    Tag / Category
                  </label>
                  <input
                    type="text"
                    value={editingService.tag || ""}
                    onChange={(e) => setEditingService({ ...editingService, tag: e.target.value })}
                    className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                    placeholder="e.g. Creative"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                  Service Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.description || ""}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                />
              </div>

              {/* Upload Media */}
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                <label className="block font-sans text-xs font-semibold text-[#9BB09E] mb-2">
                  Re-upload Service Cover Media (Image or Video)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    disabled={uploadingMedia}
                    className="block w-full font-sans text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-[#9BB09E] file:px-4 file:py-2 file:font-sans file:text-xs file:font-bold file:text-[#091E16] hover:file:bg-[#b0c7b3]"
                  />
                  {uploadingMedia && <Loader2 className="animate-spin text-[#9BB09E]" size={20} />}
                </div>
                {editingService.image && (
                  <p className="mt-2 text-[11px] text-white/50 truncate">
                    Image: {editingService.image}
                  </p>
                )}
                {editingService.video && (
                  <p className="mt-2 text-[11px] text-emerald-400 truncate">
                    Video: {editingService.video}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
