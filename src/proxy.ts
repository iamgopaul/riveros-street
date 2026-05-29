import { NextRequest, NextResponse } from "next/server";

/**
 * Subdomain routing (host -> internal path):
 *   localhost:6001        /  riverosstreet.com        -> /  (hub)
 *   eat.localhost:6001    /  eat.riverosstreet.com    -> /eat/*
 *   shop.localhost:6001   /  shop.riverosstreet.com   -> /shop/*
 *
 * Locally: use eat.localhost:6001 and shop.localhost:6001
 * (modern browsers resolve *.localhost without /etc/hosts edits)
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Strip the root domain to isolate the subdomain label
  const parts = hostname.split(".");
  let subdomain = "";
  if (hostname.endsWith("localhost")) {
    if (parts.length > 1) subdomain = parts[0];
  } else if (parts.length > 2) {
    subdomain = parts[0];
  }

  // www and apex go to hub (no rewrite)
  if (!subdomain || subdomain === "www") return NextResponse.next();

  // Already on the correct internal path? Skip.
  if (url.pathname.startsWith(`/${subdomain}`)) return NextResponse.next();

  if (subdomain === "eat" || subdomain === "shop") {
    url.pathname = `/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)"],
};
