"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#091E16] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0F3D2E]/80 p-8 shadow-2xl backdrop-blur-xl md:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9BB09E]/20 text-[#A3B899]">
            <Lock size={28} />
          </div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
            Bougain Admin
          </h1>
          <p className="mt-2 font-sans text-xs text-white/60">
            Sign in to manage videos, images, captions & customization
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 font-sans text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block font-sans text-xs font-semibold text-white/80">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/20 py-3.5 pl-11 pr-4 font-sans text-sm text-white placeholder-white/30 transition-all focus:border-[#9BB09E] focus:outline-none focus:ring-1 focus:ring-[#9BB09E]"
                placeholder="admin@bougainmedia.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block font-sans text-xs font-semibold text-white/80">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/20 py-3.5 pl-11 pr-4 font-sans text-sm text-white placeholder-white/30 transition-all focus:border-[#9BB09E] focus:outline-none focus:ring-1 focus:ring-[#9BB09E]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9BB09E] py-3.5 font-sans text-sm font-bold text-[#091E16] transition-all hover:bg-[#b0c7b3] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
