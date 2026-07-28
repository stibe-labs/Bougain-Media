"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Film,
  Layers,
  Settings,
  Briefcase,
  FolderOpen,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Portfolio & Videos", href: "/admin/portfolio", icon: Film },
  { label: "Services Media", href: "/admin/services", icon: Layers },
  { label: "Site & Hero", href: "/admin/site-settings", icon: Settings },
  { label: "Careers & Applicants", href: "/admin/careers", icon: Briefcase },
  { label: "Media Library", href: "/admin/media", icon: FolderOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login" || pathname === "/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen bg-[#091E16] text-white">
      {/* Sidebar */}
      <aside className="fixed bottom-0 top-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#0F3D2E]/90 backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9BB09E] text-[#091E16]">
              <Sparkles size={20} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Bougain CMS
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-sans text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#9BB09E] text-[#091E16] shadow-lg shadow-[#9BB09E]/10"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-sans text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pl-64 flex-1 min-h-screen">
        <div className="p-8 md:p-10">{children}</div>
      </main>
    </div>
  );
}
