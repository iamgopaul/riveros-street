"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { Palm } from "@/components/Palm";
import { Reviews } from "@/components/Reviews";
import { useI18n } from "@/lib/i18n";
import { HOURS } from "@/lib/hours";

export default function EatHome() {
  const { t } = useI18n();
  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <Palm className="absolute -left-12 bottom-0 w-52 h-auto text-accent-3/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="watermark text-[24vw] leading-none">30</span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className="tick text-[11px] uppercase tracking-[0.4em] text-foreground/60 mb-10 float-up">
            <span className="font-mono text-accent">{t("eat.kitchen")}</span>
            <span>{t("eat.openLate")}</span>
          </div>
          <h1 className="float-up font-mono font-bold uppercase tracking-tight text-[16vw] lg:text-[11rem] leading-[0.82]">
            <span className="block">{t("eat.h1.a")}</span>
            <span className="block gold-text spray">{t("eat.h1.b")}</span>
            <span className="block stencil-outline">{t("eat.h1.c")}</span>
          </h1>
          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-foreground/70 text-lg leading-relaxed">{t("eat.lede")}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/find"
                className="group inline-flex items-center gap-3 px-8 h-14 bg-accent text-white font-mono uppercase tracking-widest text-sm hover:bg-accent-soft transition-colors"
              >
                {t("eat.reserve")} <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 px-8 h-14 border border-foreground/25 font-mono uppercase tracking-widest text-sm hover:border-accent-2 hover:text-accent-2 transition-colors"
              >
                {t("eat.menu")} →
              </Link>
              <Link
                href="/order"
                className="inline-flex items-center gap-3 px-8 h-14 border border-foreground/25 font-mono uppercase tracking-widest text-sm hover:border-accent-2 hover:text-accent-2 transition-colors"
              >
                {t("eat.order")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 hazard" />

      {/* ── THREE PILLARS ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <SectionHeader index="//" label={t("eat.houseRules")} title={t("eat.houseRules.title")} />
        <div className="grid gap-px bg-border border border-border md:grid-cols-3 mt-14">
          {[
            { i: "01", t: t("eat.pillar1.title"), b: t("eat.pillar1.body") },
            { i: "02", t: t("eat.pillar2.title"), b: t("eat.pillar2.body") },
            { i: "03", t: t("eat.pillar3.title"), b: t("eat.pillar3.body") },
          ].map((p) => (
            <div key={p.i} className="bg-background p-10">
              <div className="font-mono text-accent text-sm tracking-[0.3em] mb-6">{p.i}</div>
              <h3 className="font-mono font-bold uppercase text-2xl mb-4">{p.t}</h3>
              <p className="text-foreground/70 leading-relaxed">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ────────────────────────────────────── */}
      <Reviews />

      {/* ── VISIT / HOURS ──────────────────────────────── */}
      <section id="visit" className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-28 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeader index="//" label={t("eat.visit")} />
            <h2 className="mt-5 font-mono font-bold uppercase text-4xl sm:text-6xl leading-[0.95]">
              {t("eat.visit.title1")}<br /><span className="stencil-outline">{t("eat.visit.title2")}</span>
            </h2>
          </div>
          <div>
            {HOURS.map(({ dayKey, time }, idx) => (
              <div key={dayKey} className={`flex justify-between py-4 ${idx === HOURS.length - 1 ? "" : "border-b border-border"}`}>
                <span className="uppercase tracking-widest text-sm text-foreground/60">{t(`day.${dayKey}`)}</span>
                <span className="font-mono text-foreground">{time}</span>
              </div>
            ))}
            <Link
              href="/find"
              className="mt-8 inline-flex items-center gap-3 px-8 h-14 bg-accent text-white font-mono uppercase tracking-widest text-sm hover:bg-accent-soft transition-colors"
            >
              {t("eat.bookTable")} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
