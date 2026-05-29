"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { EatNavActions } from "./EatNavActions";
import { useI18n } from "@/lib/i18n";
import { navHref, surfaceBase } from "@/lib/sites";

type Variant = "hub" | "eat" | "shop";

function isActive(pathname: string, href: string) {
  if (href.includes("?")) return false; // query-variant links don't claim active
  const path = href.split("?")[0];
  return pathname === path || pathname.startsWith(path + "/");
}

export function Nav({ variant, transparent = false }: { variant: Variant; transparent?: boolean }) {
  const { t, lang } = useI18n();
  const pathname = usePathname();

  // When `transparent`, the bar floats over the hero (red logo) until the page
  // is scrolled, then it snaps to the solid blurred background (white logo).
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);
  const floating = transparent && !scrolled;

  // Main nav — identical on every surface. Cross-subdomain links carry ?lang.
  const main = [
    { label: t("nav.home"), href: navHref("hub", "", lang), active: variant === "hub" && pathname === "/" },
    { label: t("nav.restaurant"), href: navHref("eat", "", lang), active: variant === "eat" },
    { label: t("nav.shop"), href: navHref("shop", "", lang), active: variant === "shop" },
    { label: t("nav.media"), href: navHref("hub", "/media", lang), active: variant === "hub" && pathname.startsWith("/media") },
    { label: t("nav.about"), href: navHref("hub", "/about", lang), active: variant === "hub" && pathname.startsWith("/about") },
    { label: t("nav.contact"), href: navHref("hub", "/contact", lang), active: variant === "hub" && pathname.startsWith("/contact") },
  ];

  // Sub nav — per section.
  const sub: Record<Variant, { label: string; href: string }[]> = {
    hub: [],
    eat: [
      { label: t("nav.menu"), href: `${surfaceBase("eat")}/menu` },
      { label: t("nav.reservations"), href: `${surfaceBase("eat")}/find` },
    ],
    shop: [
      { label: t("nav.trending"), href: `${surfaceBase("shop")}/products?filter=trending` },
      { label: t("nav.new"), href: `${surfaceBase("shop")}/products?filter=new` },
      { label: t("nav.all"), href: `${surfaceBase("shop")}/products` },
    ],
  };
  const subLinks = sub[variant];

  return (
    <header
      className={`z-40 transition-colors duration-300 pt-[env(safe-area-inset-top)] ${
        transparent ? "fixed top-0 inset-x-0" : "sticky top-0"
      } ${
        floating
          ? "bg-transparent border-b border-transparent"
          : "backdrop-blur-md bg-background/70 border-b border-border"
      }`}
    >
      {!floating && <div className="h-1 w-full hazard-thin" />}

      {/* ── MAIN ROW ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Logo href={surfaceBase(variant) || "/"} tone={floating ? "red" : "default"} />
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
        <div className="flex items-center gap-3 sm:gap-4">
          {variant === "eat" && <EatNavActions />}
          <LanguageToggle />
        </div>
      </div>

      {/* ── MOBILE MAIN LINKS (every surface) ─────────── */}
      <div className={`md:hidden ${floating ? "" : "border-t border-border bg-black/40"}`}>
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
                    active ? "text-accent" : "text-foreground/60 hover:text-accent"
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
