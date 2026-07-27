"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Briefcase, FileText, Loader2, Plus, Check, X, ExternalLink } from "lucide-react";

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"postings" | "applications">("postings");

  const loadData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: cData } = await supabase.from("careers").select("*").order("created_at", { ascending: false });
      const { data: aData } = await supabase.from("applications").select("*, careers(title)").order("created_at", { ascending: false });

      if (cData) setCareers(cData);
      if (aData) setApplications(aData);
    } catch {
      // Supabase unseeded fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
            Careers & Candidate Applications
          </h1>
          <p className="mt-1 font-sans text-sm text-white/60">
            Manage active job openings and review submitted candidate resumes.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#0F3D2E] p-1 border border-white/10">
          <button
            onClick={() => setActiveTab("postings")}
            className={`rounded-lg px-4 py-2 font-sans text-xs font-semibold transition-all ${
              activeTab === "postings" ? "bg-[#9BB09E] text-[#091E16]" : "text-white/70"
            }`}
          >
            Job Postings ({careers.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`rounded-lg px-4 py-2 font-sans text-xs font-semibold transition-all ${
              activeTab === "applications" ? "bg-[#9BB09E] text-[#091E16]" : "text-white/70"
            }`}
          >
            Applications ({applications.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center text-white/50">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : activeTab === "postings" ? (
        <div className="space-y-4">
          {careers.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/40 p-8 text-center text-white/50 font-sans text-sm">
              No job postings created in Supabase yet.
            </div>
          ) : (
            careers.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-white/10 bg-[#0F3D2E]/60 p-5 gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-base font-bold text-white">{job.title}</h3>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-sans text-[10px] font-bold text-emerald-300 capitalize">
                      {job.status}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs text-white/60">
                    {job.department} • {job.location} • {job.employment_type}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#0F3D2E]/40 p-8 text-center text-white/50 font-sans text-sm">
              No job applications received yet.
            </div>
          ) : (
            applications.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-white/10 bg-[#0F3D2E]/60 p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{app.full_name}</h3>
                    <p className="font-sans text-xs text-white/60">
                      Applied for: <span className="text-[#9BB09E]">{app.careers?.title || "Job opening"}</span>
                    </p>
                  </div>
                  <a
                    href={app.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 font-sans text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    View Resume
                    <ExternalLink size={13} />
                  </a>
                </div>
                <div className="font-sans text-xs text-white/50">
                  Email: {app.email} • Phone: {app.phone}
                </div>
                {app.cover_letter && (
                  <p className="rounded-xl border border-white/5 bg-black/20 p-3 font-sans text-xs text-white/80">
                    &quot;{app.cover_letter}&quot;
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
