"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getSiteSettings, uploadMediaAsset } from "@/lib/cms";
import { Loader2, Check, Upload, Settings, Sparkles, Mail, Phone, MapPin } from "lucide-react";

export default function AdminSiteSettingsPage() {
  const [heroData, setHeroData] = useState<any>({
    brand: "Bougain Mediaa",
    headline: ["Your", "Growth.", "Our", "Grind."],
    subheadline: "We blend strategy, storytelling, performance marketing, AI automation...",
    primaryCta: "Start a Conversation",
    secondaryCta: "View Our Work",
    backgroundVideo: "",
  });

  const [contactData, setContactData] = useState<any>({
    email: "mediaabougain@gmail.com",
    phone: "+91 8138-869120",
    whatsapp: "+91 8138-869120",
    office: "Kerala, India",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHeroVideo, setUploadingHeroVideo] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const h = await getSiteSettings("hero");
      const c = await getSiteSettings("contact");
      if (h) setHeroData(h);
      if (c) setContactData(c);
      setLoading(false);
    }
    load();
  }, []);

  const handleHeroVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeroVideo(true);
    try {
      const url = await uploadMediaAsset(file, "videos");
      setHeroData((prev: any) => ({ ...prev, backgroundVideo: url }));
      setMessage({ type: "success", text: "Hero background video uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Video upload failed" });
    } finally {
      setUploadingHeroVideo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const { error: heroErr } = await supabase
        .from("site_settings")
        .upsert({ key: "hero", value: heroData, updated_at: new Date().toISOString() });

      const { error: contactErr } = await supabase
        .from("site_settings")
        .upsert({ key: "contact", value: contactData, updated_at: new Date().toISOString() });

      if (heroErr || contactErr) throw heroErr || contactErr;

      setMessage({ type: "success", text: "Site customization settings saved!" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to save settings." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
          Site Customization & Hero Settings
        </h1>
        <p className="mt-1 font-sans text-sm text-white/60">
          Update the main homepage hero headline, background video, CTA buttons, and contact info.
        </p>
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
        <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
          {/* Hero Section */}
          <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-6 sm:p-8 space-y-5">
            <h2 className="font-display text-lg font-bold text-[#9BB09E] flex items-center gap-2">
              <Sparkles size={20} />
              Homepage Hero Section
            </h2>

            <div>
              <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                value={heroData.brand || ""}
                onChange={(e) => setHeroData({ ...heroData, brand: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                Main Subheadline Text
              </label>
              <textarea
                rows={3}
                value={heroData.subheadline || ""}
                onChange={(e) => setHeroData({ ...heroData, subheadline: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
              />
            </div>

            {/* Background Video */}
            <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
              <label className="block font-sans text-xs font-semibold text-[#9BB09E] mb-2">
                Upload / Re-upload Hero Background Reel (.mp4)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleHeroVideoUpload}
                  disabled={uploadingHeroVideo}
                  className="block w-full font-sans text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-[#9BB09E] file:px-4 file:py-2 file:font-sans file:text-xs file:font-bold file:text-[#091E16] hover:file:bg-[#b0c7b3]"
                />
                {uploadingHeroVideo && <Loader2 className="animate-spin text-[#9BB09E]" size={20} />}
              </div>
              {heroData.backgroundVideo && (
                <p className="mt-2 text-[11px] text-emerald-400 truncate">
                  Hero Video: {heroData.backgroundVideo}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={heroData.primaryCta || ""}
                  onChange={(e) => setHeroData({ ...heroData, primaryCta: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={heroData.secondaryCta || ""}
                  onChange={(e) => setHeroData({ ...heroData, secondaryCta: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/60 p-6 sm:p-8 space-y-5">
            <h2 className="font-display text-lg font-bold text-[#9BB09E] flex items-center gap-2">
              <Mail size={20} />
              Contact Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactData.email || ""}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="text"
                  value={contactData.phone || ""}
                  onChange={(e) =>
                    setContactData({ ...contactData, phone: e.target.value, whatsapp: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold text-white/80 mb-2">
                Office Location
              </label>
              <input
                type="text"
                value={contactData.office || ""}
                onChange={(e) => setContactData({ ...contactData, office: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-2.5 font-sans text-sm text-white focus:border-[#9BB09E] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#9BB09E] px-8 py-3.5 font-sans text-sm font-bold text-[#091E16] hover:bg-[#b0c7b3] transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            Save All Customization Settings
          </button>
        </form>
      )}
    </div>
  );
}
