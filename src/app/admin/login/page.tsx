import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-md rounded-3xl border border-forest-deep/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-forest-deep">
          Admin Login
        </h1>
        <p className="mt-2 text-sm text-[#1a1a1a]/70">
          Configure Supabase in <code className="text-sage">.env.local</code> to
          enable authentication. Coming in Phase 4.
        </p>
        <form className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block font-sans text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              disabled
              className="w-full rounded-xl border border-forest-deep/15 bg-cream/50 px-4 py-3 font-sans text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block font-sans text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              disabled
              className="w-full rounded-xl border border-forest-deep/15 bg-cream/50 px-4 py-3 font-sans text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="button"
            disabled
            className="w-full rounded-full bg-forest-deep/50 py-3 font-sans text-sm font-medium text-white"
          >
            Sign In (configure Supabase first)
          </button>
        </form>
      </div>
    </div>
  );
}
