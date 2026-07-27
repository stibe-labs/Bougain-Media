"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Film,
  Layers,
  Settings,
  FolderOpen,
  Database,
  Loader2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getPortfolioItems, getServices } from "@/lib/cms";

export default function AdminDashboardPage() {
  const [portfolioCount, setPortfolioCount] = useState<number>(0);
  const [videoCount, setVideoCount] = useState<number>(0);
  const [serviceCount, setServiceCount] = useState<number>(0);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadStats() {
      const items = await getPortfolioItems();
      const svcs = await getServices();
      setPortfolioCount(items.length);
      setVideoCount(items.filter((i) => i.videoSrc).length);
      setServiceCount(svcs.length);
    }
    loadStats();
  }, []);

  const handleSeedDatabase = async () => {
    if (!confirm("This will initialize Supabase tables with the default site content. Continue?")) return;
    setSeeding(true);
    setSeedMessage(null);

    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        setSeedMessage({ type: "success", text: "Database populated successfully!" });
        const items = await getPortfolioItems();
        const svcs = await getServices();
        setPortfolioCount(items.length);
        setVideoCount(items.filter((i) => i.videoSrc).length);
        setServiceCount(svcs.length);
      } else {
        setSeedMessage({ type: "error", text: data.error || "Seeding failed." });
      }
    } catch (err: any) {
      setSeedMessage({ type: "error", text: err.message || "Failed to trigger seed." });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-3xl border border-white/10 bg-[#0F3D2E] p-8 shadow-xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
            Bougain Media Admin Control Panel
          </h1>
          <p className="mt-1 font-sans text-sm text-white/60">
            Manage video reels, portfolio showcases, service media, captions, and site customization.
          </p>
        </div>

        <button
          onClick={handleSeedDatabase}
          disabled={seeding}
          className="flex items-center gap-2 rounded-xl bg-[#9BB09E] px-5 py-3 font-sans text-xs font-bold text-[#091E16] hover:bg-[#b0c7b3] transition-all disabled:opacity-50"
        >
          {seeding ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Database size={16} />
          )}
          Seed Supabase Database
        </button>
      </div>

      {seedMessage && (
        <div
          className={`flex items-center gap-3 rounded-2xl border p-4 font-sans text-sm ${
            seedMessage.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-rose-500/30 bg-rose-500/10 text-rose-300"
          }`}
        >
          {seedMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {seedMessage.text}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/50 p-6">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-white/60">Portfolio Items</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#9BB09E]">
              <Film size={20} />
            </div>
          </div>
          <p className="mt-4 font-display text-3xl font-bold text-white">{portfolioCount}</p>
          <p className="mt-1 font-sans text-xs text-white/40">{videoCount} items with video reels</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/50 p-6">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-white/60">Service Offerings</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#9BB09E]">
              <Layers size={20} />
            </div>
          </div>
          <p className="mt-4 font-display text-3xl font-bold text-white">{serviceCount}</p>
          <p className="mt-1 font-sans text-xs text-white/40">Active service practices</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/50 p-6">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-white/60">Subdomain Host</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#9BB09E]">
              <FolderOpen size={20} />
            </div>
          </div>
          <p className="mt-4 font-display text-lg font-bold text-[#9BB09E]">admin.bougainmedia.com</p>
          <p className="mt-1 font-sans text-xs text-white/40">Secure Nginx Reverse Proxy</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <h2 className="font-display text-xl font-bold text-white">Customization Modules</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/portfolio"
          className="group rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-7 transition-all hover:border-[#9BB09E]/50 hover:bg-[#0F3D2E]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9BB09E]/20 text-[#9BB09E]">
              <Film size={24} />
            </div>
            <ArrowRight size={20} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#9BB09E]" />
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-white">Portfolio & Video Reel Manager</h3>
          <p className="mt-2 font-sans text-xs text-white/60 leading-relaxed">
            Upload new `.mp4` video reels, change thumbnails, edit captions, client names, category tags, and aspect ratios.
          </p>
        </Link>

        <Link
          href="/admin/services"
          className="group rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-7 transition-all hover:border-[#9BB09E]/50 hover:bg-[#0F3D2E]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9BB09E]/20 text-[#9BB09E]">
              <Layers size={24} />
            </div>
            <ArrowRight size={20} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#9BB09E]" />
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-white">Services Media Manager</h3>
          <p className="mt-2 font-sans text-xs text-white/60 leading-relaxed">
            Update service titles, feature checklists, client stat metrics, and service card cover images/videos.
          </p>
        </Link>

        <Link
          href="/admin/site-settings"
          className="group rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-7 transition-all hover:border-[#9BB09E]/50 hover:bg-[#0F3D2E]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9BB09E]/20 text-[#9BB09E]">
              <Settings size={24} />
            </div>
            <ArrowRight size={20} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#9BB09E]" />
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-white">Hero & Site Settings</h3>
          <p className="mt-2 font-sans text-xs text-white/60 leading-relaxed">
            Customize main hero headlines, brand tagline, hero video background, and contact details.
          </p>
        </Link>

        <Link
          href="/admin/media"
          className="group rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-7 transition-all hover:border-[#9BB09E]/50 hover:bg-[#0F3D2E]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9BB09E]/20 text-[#9BB09E]">
              <FolderOpen size={24} />
            </div>
            <ArrowRight size={20} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#9BB09E]" />
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-white">Media Asset Library</h3>
          <p className="mt-2 font-sans text-xs text-white/60 leading-relaxed">
            Direct access to Supabase Storage bucket. Upload assets, copy public URLs, or clean up unused videos.
          </p>
        </Link>
      </div>
    </div>
  );
}
