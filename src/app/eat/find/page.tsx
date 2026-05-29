"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/sites";
import { HOURS } from "@/lib/hours";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rivero%27s+Street+30+Lowery+Rd+Unit+B+Freeport+FL+32439";

export default function FindPage() {
  const { t } = useI18n();
  return (
    <section className="max-w-5xl mx-auto px-6 py-28">
      <SectionHeader index="//" label={t("find.eyebrow")} align="center" />
      <h1 className="mt-6 font-mono font-bold uppercase text-5xl sm:text-7xl leading-[0.95] text-center">
        {t("find.title.a")} <span className="gold-text spray">{t("find.title.b")}</span>
      </h1>
      <p className="mt-8 text-center text-foreground/60 max-w-lg mx-auto">{t("find.lede")}</p>

      <div className="mt-16 grid gap-px bg-border border border-border md:grid-cols-2">
        {/* Address */}
        <div className="bg-background p-10">
          <div className="text-[11px] uppercase tracking-[0.4em] text-accent mb-5">{t("find.addressLabel")}</div>
          <p className="font-mono uppercase text-2xl leading-snug">
            30 Lowery Rd, Unit B<br />Freeport, FL 32439
          </p>
          <div className="mt-6">
            <div className="text-[11px] uppercase tracking-[0.4em] text-accent mb-2">{t("find.phoneLabel")}</div>
            <a href={PHONE_TEL} className="font-mono text-xl link-shimmer hover:text-accent transition-colors">
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 h-12 border border-accent text-accent font-mono uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-colors"
            >
              {t("find.directions")} →
            </Link>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-3 px-6 h-12 border border-foreground/25 font-mono uppercase tracking-widest text-xs hover:border-accent hover:text-accent transition-colors"
            >
              {t("find.call")} →
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-background p-10">
          <div className="text-[11px] uppercase tracking-[0.4em] text-accent mb-5">{t("find.hoursLabel")}</div>
          {HOURS.map(({ dayKey, time }, idx) => (
            <div key={dayKey} className={`flex justify-between py-3 ${idx === HOURS.length - 1 ? "" : "border-b border-border"}`}>
              <span className="uppercase tracking-widest text-sm text-foreground/60">{t(`day.${dayKey}`)}</span>
              <span className="font-mono text-foreground">{time}</span>
            </div>
          ))}
          <Link
            href="/order"
            className="mt-8 inline-flex items-center gap-3 px-6 h-12 bg-accent text-white font-mono uppercase tracking-widest text-xs hover:bg-accent-soft transition-colors"
          >
            {t("find.orderCta")} →
          </Link>
        </div>
      </div>

      {/* Map embed */}
      <div className="mt-px border border-border overflow-hidden aspect-[16/7] [&_iframe]:invert [&_iframe]:hue-rotate-180">
        <iframe
          title="Rivero's Street location map"
          src="https://www.google.com/maps?q=30+Lowery+Rd+Unit+B+Freeport+FL+32439&output=embed"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
