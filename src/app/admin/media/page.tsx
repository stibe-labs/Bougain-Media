"use client";

import { useState, useEffect } from "react";
import {
  FolderOpen,
  Upload,
  Copy,
  Check,
  Trash2,
  Loader2,
  Play,
  Image as ImageIcon,
  Edit3,
  Search,
  RefreshCw,
  Cloud,
  Film,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";

interface MediaFile {
  key: string;
  name: string;
  folder: string;
  size: number;
  contentType: string;
  publicUrl: string;
  lastModified: string;
}

export default function AdminMediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadFolder, setUploadFolder] = useState<string>("videos/Content Videos");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Rename modal state
  const [renamingFile, setRenamingFile] = useState<MediaFile | null>(null);
  const [newFileName, setNewFileName] = useState("");
  const [renaming, setRenaming] = useState(false);

  const loadMediaFiles = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load media files");
      setFiles(data.items || []);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Could not fetch media files from Cloudflare R2." });
    } finally {
      setLoading(false);
    }
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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMessage({ type: "success", text: `Asset successfully uploaded to Cloudflare R2: ${data.fileName || file.name}` });
      await loadMediaFiles();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "File upload failed." });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Are you sure you want to permanently delete "${file.name}" from Cloudflare R2?`)) return;

    try {
      const res = await fetch(`/api/admin/media?key=${encodeURIComponent(file.key)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setMessage({ type: "success", text: `File "${file.name}" permanently deleted from R2.` });
      setFiles((prev) => prev.filter((f) => f.key !== file.key));
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to delete file." });
    }
  };

  const openRenameModal = (file: MediaFile) => {
    setRenamingFile(file);
    // Remove extension for easier editing
    const ext = file.name.split(".").pop();
    const base = ext ? file.name.substring(0, file.name.length - ext.length - 1) : file.name;
    setNewFileName(base);
  };

  const handleRenameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingFile || !newFileName.trim()) return;

    setRenaming(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/media/rename", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldKey: renamingFile.key,
          newName: newFileName.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to rename file");

      setMessage({ type: "success", text: data.message || `File renamed to "${data.newName}" successfully!` });
      setRenamingFile(null);
      await loadMediaFiles();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Rename operation failed." });
    } finally {
      setRenaming(false);
    }
  };

  // Filter items
  const filteredFiles = files.filter((file) => {
    const matchesFolder =
      activeFolder === "all"
        ? true
        : activeFolder === "ai"
        ? file.folder.toLowerCase().includes("ai")
        : activeFolder === "content"
        ? file.folder.toLowerCase().includes("content")
        : activeFolder === "images"
        ? file.folder.toLowerCase().includes("image")
        : true;

    const matchesSearch =
      searchQuery === "" ||
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.folder.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  const aiCount = files.filter((f) => f.folder.toLowerCase().includes("ai")).length;
  const contentCount = files.filter((f) => f.folder.toLowerCase().includes("content")).length;
  const imagesCount = files.filter((f) => f.folder.toLowerCase().includes("image")).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
              Media Asset Library
            </h1>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
              <Cloud size={12} />
              Cloudflare R2 Bucket
            </span>
          </div>
          <p className="mt-1 font-sans text-sm text-white/60">
            Directly browse, stream, rename, and manage video reels and image assets stored in R2.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadMediaFiles}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-sans text-xs font-bold text-white hover:bg-white/20 transition-all border border-white/15 disabled:opacity-50"
            title="Refresh assets list"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <div className="flex items-center gap-2">
            <select
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value)}
              className="rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 font-sans text-xs text-white focus:border-[#9BB09E] focus:outline-none"
            >
              <option value="videos/Content Videos">Folder: Content Videos</option>
              <option value="videos/Bougain AI videos">Folder: Bougain AI Videos</option>
              <option value="images">Folder: Images</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer rounded-xl bg-[#9BB09E] px-4 py-2.5 font-sans text-xs font-bold text-[#091E16] hover:bg-[#b0c7b3] transition-all">
              <Upload size={15} />
              <span>{uploading ? "Uploading..." : "Upload Asset"}</span>
              <input
                type="file"
                accept="video/*,image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {uploading && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 font-sans text-sm text-emerald-300">
          <Loader2 className="animate-spin" size={18} />
          Uploading asset directly to Cloudflare R2 bucket...
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

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Folder Tabs */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-1.5">
          <button
            onClick={() => setActiveFolder("all")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold transition-all ${
              activeFolder === "all"
                ? "bg-[#9BB09E] text-[#091E16]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FolderOpen size={14} />
            All Files ({files.length})
          </button>

          <button
            onClick={() => setActiveFolder("content")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold transition-all ${
              activeFolder === "content"
                ? "bg-[#9BB09E] text-[#091E16]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Film size={14} />
            Content Videos ({contentCount})
          </button>

          <button
            onClick={() => setActiveFolder("ai")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold transition-all ${
              activeFolder === "ai"
                ? "bg-[#9BB09E] text-[#091E16]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Sparkles size={14} />
            Bougain AI Videos ({aiCount})
          </button>

          <button
            onClick={() => setActiveFolder("images")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-bold transition-all ${
              activeFolder === "images"
                ? "bg-[#9BB09E] text-[#091E16]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ImageIcon size={14} />
            Images ({imagesCount})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search assets by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/30 pl-10 pr-4 py-2.5 font-sans text-xs text-white placeholder:text-white/40 focus:border-[#9BB09E] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Media Assets */}
      {loading ? (
        <div className="flex h-64 items-center justify-center text-white/50">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/40 p-12 text-center text-white/50 font-sans text-sm">
          No media files found matching the selected filter.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFiles.map((file) => {
            const isVideo = file.name.endsWith(".mp4") || file.name.endsWith(".webm");
            const isMp4 = file.name.endsWith(".mp4");
            const isWebm = file.name.endsWith(".webm");

            return (
              <div
                key={file.key}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-5 transition-all hover:border-[#9BB09E]/40"
              >
                {/* Media Preview Box */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/50">
                  {isVideo ? (
                    <video
                      src={file.publicUrl}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={file.publicUrl}
                      alt={file.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}

                  {/* Folder Tag */}
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 font-sans text-[10px] font-bold text-[#9BB09E] backdrop-blur-sm pointer-events-none">
                    {isVideo ? <Play size={10} className="fill-current" /> : <ImageIcon size={10} />}
                    {file.folder.replace("videos/", "")}
                  </span>

                  {/* Format Badge */}
                  {isVideo && (
                    <span className={`absolute right-3 top-3 rounded-full px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm pointer-events-none ${
                      isMp4 ? "bg-emerald-500/80 text-white" : "bg-teal-500/80 text-white"
                    }`}>
                      {isMp4 ? "MP4 (iOS)" : "WebM"}
                    </span>
                  )}
                </div>

                {/* File Information */}
                <div className="mt-4 flex-1">
                  <p className="font-sans text-xs font-semibold text-white truncate" title={file.name}>
                    {file.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-white/40 font-sans">
                    <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>{new Date(file.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 gap-2">
                  <button
                    onClick={() => handleCopy(file.publicUrl)}
                    className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 font-sans text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                    title="Copy Public R2 URL"
                  >
                    {copiedUrl === file.publicUrl ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedUrl === file.publicUrl ? "Copied!" : "Copy URL"}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openRenameModal(file)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-[#9BB09E] hover:text-[#091E16] transition-colors"
                      title="Rename Video / File"
                    >
                      <Edit3 size={14} />
                    </button>

                    <button
                      onClick={() => handleDelete(file)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors"
                      title="Delete from R2"
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

      {/* Rename Modal */}
      {renamingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#0F3D2E] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="text-[#9BB09E]" size={20} />
                <h2 className="font-display text-lg font-bold text-white">
                  Rename Media File
                </h2>
              </div>
              <button
                onClick={() => setRenamingFile(null)}
                className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRenameSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block font-sans text-xs font-semibold text-white/70 mb-1.5">
                  Current Key in Cloudflare R2
                </label>
                <p className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2 font-mono text-xs text-white/50 break-all">
                  {renamingFile.key}
                </p>
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-white/90 mb-1.5">
                  New File Name
                </label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Enter new file name..."
                  autoFocus
                  className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                />
                <p className="mt-1.5 font-sans text-[11px] text-white/50">
                  Tip: Both .webm and .mp4 companion files and database project links will be updated automatically.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setRenamingFile(null)}
                  disabled={renaming}
                  className="rounded-xl px-4 py-2 font-sans text-xs font-semibold text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={renaming || !newFileName.trim()}
                  className="flex items-center gap-2 rounded-xl bg-[#9BB09E] px-5 py-2.5 font-sans text-xs font-bold text-[#091E16] hover:bg-[#b0c7b3] disabled:opacity-50 transition-all"
                >
                  {renaming ? <Loader2 className="animate-spin" size={15} /> : <Check size={15} />}
                  <span>{renaming ? "Renaming in R2..." : "Save & Rename"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
