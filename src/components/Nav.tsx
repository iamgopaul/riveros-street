"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";
import { SITES, withLang } from "@/lib/sites";

type Variant = "hub" | "eat" | "shop";

function isActive(pathname: string, href: string) {
  if (href.includes("?")) return false; // query-variant links don't claim active
  const path = href.split("?")[0];
  return pathname === path || pathname.startsWith(path + "/");
}

export function Nav({ variant }: { variant: Variant }) {
  const { t, lang } = useI18n();
  const pathname = usePathname();

  // Main nav — identical on every surface. Cross-subdomain links carry ?lang.
  const main = [
    { label: t("nav.home"), href: withLang(SITES.hub, lang), active: variant === "hub" && pathname === "/" },
    { label: t("nav.restaurant"), href: withLang(SITES.eat, lang), active: variant === "eat" },
    { label: t("nav.shop"), href: withLang(SITES.shop, lang), active: variant === "shop" },
    { label: t("nav.media"), href: withLang(`${SITES.hub}/media`, lang), active: variant === "hub" && pathname.startsWith("/media") },
    { label: t("nav.about"), href: withLang(`${SITES.hub}/about`, lang), active: variant === "hub" && pathname.startsWith("/about") },
    { label: t("nav.contact"), href: withLang(`${SITES.hub}/contact`, lang), active: variant === "hub" && pathname.startsWith("/contact") },
  ];

  // Sub nav — per section.
  const sub: Record<Variant, { label: string; href: string }[]> = {
    hub: [],
    eat: [
      { label: t("nav.menu"), href: "/menu" },
      { label: t("nav.reservations"), href: "/find" },
      { label: t("nav.order"), href: "/order" },
    ],
    shop: [
      { label: t("nav.trending"), href: "/products?filter=trending" },
      { label: t("nav.new"), href: "/products?filter=new" },
      { label: t("nav.all"), href: "/products" },
    ],
  };
  const subLinks = sub[variant];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="h-1 w-full hazard-thin" />

      {/* ── MAIN ROW ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Logo href="/" />
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm uppercase tracking-widest">
          {main.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`link-shimmer transition-colors ${
                l.active ? "text-accent" : "text-foreground/80 hover:text-accent"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <LanguageToggle />
      </div>

      {/* ── MOBILE MAIN LINKS (every surface) ─────────── */}
      <div className="md:hidden border-t border-border bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center gap-7 text-xs uppercase tracking-widest overflow-x-auto">
          {main.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`whitespace-nowrap transition-colors ${
                l.active ? "text-accent" : "text-foreground/70 hover:text-accent"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── SUB ROW (food truck / shop) ──────────────── */}
      {subLinks.length > 0 && (
        <div className="border-t border-border bg-black/40">
          <div className="max-w-7xl mx-auto px-6 h-11 flex items-center gap-8 text-xs uppercase tracking-widest overflow-x-auto">
            {subLinks.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap transition-colors ${
                    active ? "text-accent" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
