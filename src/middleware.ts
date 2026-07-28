import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isAdminSubdomain = host.startsWith("admin.");
  let pathname = request.nextUrl.pathname;

  let effectivePathname = pathname;
  let needsRewrite = false;

  if (isAdminSubdomain && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
    if (!pathname.startsWith("/admin")) {
      effectivePathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
      needsRewrite = true;
    }
  }

  let rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = effectivePathname;

  let response = needsRewrite
    ? NextResponse.rewrite(rewriteUrl)
    : NextResponse.next({ request });

  // Admin route protection via NextAuth cookie
  const isAdminRoute = effectivePathname.startsWith("/admin");
  const isLoginPage = effectivePathname === "/admin/login";

  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  if (isAdminRoute && !isLoginPage && !sessionToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = isAdminSubdomain ? "/login" : "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && sessionToken) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = isAdminSubdomain ? "/" : "/admin";
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
