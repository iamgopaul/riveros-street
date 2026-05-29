"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { AwardBadge } from "@/components/AwardBadge";
import { useI18n } from "@/lib/i18n";
import { navHref, surfaceHost, PHONE_DISPLAY } from "@/lib/sites";
import { HOURS } from "@/lib/hours";

export default function HubHome() {
  const { t, lang } = useI18n();
  return (
    <>
      <Nav variant="hub" transparent />
      <main className="flex-1">
        {/* ── HERO ───────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border flex flex-col min-h-[100svh]">
          {/* Hero background image with a scrim that fades into the page */}
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: "url(/home-bg.webp)" }}
          />
          <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/55 via-background/50 to-background" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="watermark text-[26vw] leading-none">850</span>
          </div>

          {/* Restaurant Guru award — corner seal, top-right, clear of the nav
              (safe-area aware so it sits below the bar on notched phones). */}
          <AwardBadge className="absolute z-10 drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] right-4 top-[calc(7rem+env(safe-area-inset-top))] w-16 sm:right-8 sm:w-28 md:top-32 md:w-36" />

          <div className="relative max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center pt-[calc(7rem+env(safe-area-inset-top))] pb-16">
            <div className="tick inline-flex self-start text-[11px] uppercase tracking-[0.4em] text-foreground/70 mb-8 float-up bg-background/55 backdrop-blur-sm border border-border/60 px-4 py-2">
              <span className="font-mono text-accent">{t("hub.est")}</span>
              <span>{t("hub.oneAddress")}</span>
            </div>

            <h1 className="hero-stagger font-mono font-bold uppercase tracking-tight leading-[0.85] text-[clamp(3.5rem,13vw,10rem)]">
              <span className="block hero-line-glow">{t("hub.h1.a")}</span>
              <span className="block gold-text hero-line-glow">{t("hub.h1.b")}</span>
              <span className="block cyan-text hero-line-glow">{t("hub.h1.c")}</span>
            </h1>

            <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-md self-start text-foreground/80 text-base sm:text-lg leading-relaxed bg-background/55 backdrop-blur-sm border border-border/60 p-5">
                {t("hub.lede")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={navHref("eat", "", lang)}
                  className="group inline-flex items-center gap-3 px-8 h-14 bg-accent text-white font-mono uppercase tracking-widest text-sm hover:bg-accent-soft transition-colors"
                >
                  {t("nav.restaurant")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href={navHref("shop", "", lang)}
                  className="group inline-flex items-center gap-3 px-8 h-14 border border-foreground/25 font-mono uppercase tracking-widest text-sm hover:border-accent-2 hover:text-accent-2 transition-colors"
                >
                  {t("nav.shop")}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── INFO STRIP ─────────────────────────────────── */}
        <section className="border-b border-border bg-black">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <StripCell label={t("hub.strip.cuisine")} value={t("eat.kitchen")} />
            <StripCell label={t("hub.detail.address")} value={t("hub.strip.where")} />
            <StripCell label={t("hub.detail.hours")} value={t("hub.strip.hours")} />
          </div>
        </section>

        {/* ── TWO HOUSES ─────────────────────────────────── */}
        <section id="story" className="max-w-7xl mx-auto px-6 py-28">
          <SectionHeader index="//" label={t("hub.twoHouses")} title={t("hub.twoHouses.title")} />
          <div className="grid gap-6 md:grid-cols-2 mt-14">
            <HouseCard
              index="01"
              tag={t("hub.house1.tag")}
              title={t("hub.house1.title")}
              body={t("hub.house1.body")}
              cta={surfaceHost("eat")}
              href={navHref("eat", "", lang)}
            />
            <HouseCard
              index="02"
              tag={t("hub.house2.tag")}
              title={t("hub.house2.title")}
              body={t("hub.house2.body")}
              cta={surfaceHost("shop")}
              href={navHref("shop", "", lang)}
            />
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────────── */}
        <section id="contact" className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-28 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <SectionHeader index="//" label={t("hub.findUs")} />
              <h3 className="mt-5 font-mono font-bold uppercase text-4xl sm:text-6xl leading-[0.95]">
                {t("hub.come")}<br /><span className="stencil-outline">{t("hub.stay")}</span>
              </h3>
            </div>
            <div className="space-y-0">
              <DetailRow label={t("hub.detail.address")} value={["30 Lowery Rd, Unit B", "Freeport, FL 32439"]} />
              <DetailRow
                label={t("hub.detail.hours")}
                value={HOURS.map(({ dayKey, time }) => `${t(`day.${dayKey}`)} · ${time}`)}
              />
              <DetailRow label={t("hub.detail.order")} value={[PHONE_DISPLAY, `${surfaceHost("eat")}/menu`]} last />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StripCell({ label, value }: { label: string; value: string }) {
  const lines = value.split("\n");
  return (
    <div className="px-6 py-7">
      <div className="tick text-[10px] uppercase tracking-[0.4em] text-accent mb-3">{label}</div>
      <div className="font-mono uppercase text-sm sm:text-base text-foreground/90 leading-snug space-y-0.5">
        {lines.map((line) => <div key={line}>{line}</div>)}
      </div>
    </div>
  );
}

function HouseCard({
  index, tag, title, body, cta, href,
}: { index: string; tag: string; title: string; body: string; cta: string; href: string }) {
  return (
    <a href={href} className="group relative panel panel-hover block p-10 overflow-hidden">
      <span className="watermark text-[12rem] -bottom-10 -right-4 leading-none">{index}</span>
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono text-accent text-sm tracking-[0.3em]">{index}</span>
          <span className="text-[11px] uppercase tracking-[0.4em] text-foreground/50">{tag}</span>
        </div>
        <div className="font-mono font-bold uppercase text-4xl mb-5">{title}</div>
        <p className="text-foreground/70 leading-relaxed max-w-md">{body}</p>
        <div className="mt-10 inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-accent">
          {cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}

function DetailRow({ label, value, last }: { label: string; value: string[]; last?: boolean }) {
  return (
    <div className={`grid grid-cols-[7rem_1fr] gap-6 py-5 ${last ? "" : "border-b border-border"}`}>
      <div className="text-[11px] uppercase tracking-[0.3em] text-accent pt-1">{label}</div>
      <div className="space-y-1 text-foreground/80">{value.map((v) => <div key={v}>{v}</div>)}</div>
    </div>
  );
}
