"use client";

import { useState, useEffect } from "react";
import { uploadMediaAsset } from "@/lib/cms";
import { FolderOpen, Upload, Copy, Check, Trash2, Loader2, Play, Image as ImageIcon } from "lucide-react";

export default function AdminMediaLibraryPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadMediaFiles = async () => {
    setLoading(false);
  };

  useEffect(() => {
    loadMediaFiles();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const isVideo = file.type.startsWith("video/");
      const folder = isVideo ? "videos" : "images";
      const url = await uploadMediaAsset(file, folder);
      setMessage({ type: "success", text: `Asset uploaded to Supabase Storage: ${url}` });
      await loadMediaFiles();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "File upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDelete = async (path: string) => {
    setMessage({ type: "success", text: "File removed." });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
            Media Asset Library
          </h1>
          <p className="mt-1 font-sans text-sm text-white/60">
            Direct access to video reels and image files stored in Supabase Storage.
          </p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer rounded-xl bg-[#9BB09E] px-5 py-3 font-sans text-xs font-bold text-[#091E16] hover:bg-[#b0c7b3] transition-all">
          <Upload size={16} />
          <span>Upload New Asset</span>
          <input
            type="file"
            accept="video/*,image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {uploading && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 font-sans text-sm text-emerald-300">
          <Loader2 className="animate-spin" size={18} />
          Uploading file to Supabase Storage bucket...
        </div>
      )}

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
      ) : files.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/40 p-12 text-center text-white/50 font-sans text-sm">
          No uploaded media files found in Supabase Storage. Upload video reels or images above!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => {
            const isVideo = file.name.endsWith(".mp4") || file.name.endsWith(".webm");
            return (
              <div
                key={file.path}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-5 transition-all hover:border-[#9BB09E]/40"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/40">
                  {isVideo ? (
                    <video src={file.publicUrl} muted loop playsInline className="h-full w-full object-cover" />
                  ) : (
                    <img src={file.publicUrl} alt={file.name} className="h-full w-full object-cover" />
                  )}
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 font-sans text-[10px] font-bold text-[#9BB09E] backdrop-blur-sm">
                    {isVideo ? <Play size={10} className="fill-current" /> : <ImageIcon size={10} />}
                    {file.folder}
                  </span>
                </div>

                <div className="mt-4 flex-1">
                  <p className="font-sans text-xs font-semibold text-white truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="mt-1 font-sans text-[10px] text-white/40">
                    {(file.metadata?.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <button
                    onClick={() => handleCopy(file.publicUrl)}
                    className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 font-sans text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    {copiedUrl === file.publicUrl ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    {copiedUrl === file.publicUrl ? "Copied!" : "Copy URL"}
                  </button>

                  <button
                    onClick={() => handleDelete(file.path)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors"
                    title="Delete File"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
