import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isAdminSubdomain = host.startsWith("admin.");
  let pathname = request.nextUrl.pathname;

  let effectivePathname = pathname;
  let needsRewrite = false;

  // 1. Compute effective pathname for admin subdomain
  if (isAdminSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    if (!pathname.startsWith("/admin")) {
      effectivePathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
      needsRewrite = true;
    }
  }

  let rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = effectivePathname;

  let supabaseResponse = needsRewrite ? NextResponse.rewrite(rewriteUrl) : NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase credentials are not configured, bypass auth check safely
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = needsRewrite ? NextResponse.rewrite(rewriteUrl) : NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAdminRoute = effectivePathname.startsWith("/admin");
    const isLoginPage = effectivePathname === "/admin/login";

    if (isAdminRoute && !isLoginPage && !user) {
      const url = request.nextUrl.clone();
      url.pathname = isAdminSubdomain ? "/login" : "/admin/login";
      return NextResponse.redirect(url);
    }

    if (isLoginPage && user) {
      const url = request.nextUrl.clone();
      url.pathname = isAdminSubdomain ? "/" : "/admin";
      return NextResponse.redirect(url);
    }
  } catch (e) {
    // Ignore auth session error if Supabase credentials invalid
  }

  return supabaseResponse;
}
