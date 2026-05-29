"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { PHONE_DISPLAY, PHONE_TEL, eatPath } from "@/lib/sites";
import { HOURS } from "@/lib/hours";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rivero%27s+Street+30+Lowery+Rd+Unit+B+Freeport+FL+32439";

/** "11 AM" → 11, "10 PM" → 22, "12 AM" → 0, "12 PM" → 12 */
function parseHour(s: string): number {
  const m = s.trim().match(/(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10) % 12;
  if (/pm/i.test(m[2])) h += 12;
  return h;
}

/** Today's open/closed status, computed client-side to avoid hydration drift. */
function useOpenStatus() {
  const [s, setS] = useState<{ open: boolean; until: string; opens: string; todayIdx: number } | null>(null);
  useEffect(() => {
    const now = new Date();
    const todayIdx = (now.getDay() + 6) % 7; // HOURS is Mon-first; getDay() is Sun-first
    const [openStr, closeStr] = HOURS[todayIdx].time.split(" to ");
    const h = now.getHours() + now.getMinutes() / 60;
    setS({
      open: h >= parseHour(openStr) && h < parseHour(closeStr),
      until: closeStr,
      opens: openStr,
      todayIdx,
    });
  }, []);
  return s;
}

export default function FindPage() {
  const { t } = useI18n();
  const status = useOpenStatus();

  return (
    <section className="max-w-5xl mx-auto px-6 pt-28 pb-28">
      <SectionHeader index="//" label={t("find.eyebrow")} align="center" />
      <h1 className="mt-6 font-mono font-bold uppercase text-5xl sm:text-7xl leading-[0.95] text-center">
        {t("find.title.a")} <span className="gold-text spray">{t("find.title.b")}</span>
      </h1>
      <p className="mt-6 text-center text-foreground/60 max-w-lg mx-auto">{t("find.lede")}</p>

      {/* live status */}
      {status && (
        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center gap-2.5 px-4 h-9 border border-border bg-black/30 text-xs uppercase tracking-widest">
            <span className={`h-2 w-2 rounded-full ${status.open ? "bg-green-400 animate-pulse" : "bg-foreground/40"}`} />
            {status.open ? (
              <span className="text-foreground/80">{t("find.openNow")} · {t("find.until")} {status.until}</span>
            ) : (
              <span className="text-foreground/60">{t("find.closed")} · {t("find.opens")} {status.opens}</span>
            )}
          </span>
        </div>
      )}

      <div className="mt-12 grid gap-px bg-border border border-border md:grid-cols-2">
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
          {HOURS.map(({ dayKey, time }, idx) => {
            const isToday = status?.todayIdx === idx;
            return (
              <div
                key={dayKey}
                className={`flex justify-between py-3 ${idx === HOURS.length - 1 ? "" : "border-b border-border"} ${
                  isToday ? "text-accent" : ""
                }`}
              >
                <span className="uppercase tracking-widest text-sm flex items-center gap-2">
                  {t(`day.${dayKey}`)}
                  {isToday && <span className="text-[9px] tracking-[0.3em] text-accent/70">({t("find.today")})</span>}
                </span>
                <span className="font-mono">{time}</span>
              </div>
            );
          })}
          <Link
            href={eatPath("/menu")}
            className="mt-8 inline-flex items-center gap-3 px-6 h-12 bg-accent text-white font-mono uppercase tracking-widest text-xs hover:bg-accent-soft transition-colors"
          >
            {t("nav.orderNow")} →
          </Link>
        </div>
      </div>

      {/* Map embed */}
      <div className="mt-px border border-border overflow-hidden aspect-[16/7] map-themed">
        <iframe
          title="Rivero's Street location map"
          src="https://www.google.com/maps?q=Rivero%27s+Street%2C+30+Lowery+Rd+Unit+B%2C+Freeport%2C+FL+32439&output=embed"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* How pickup works */}
      <div className="mt-20">
        <SectionHeader index="//" label={t("find.pickupTitle")} align="center" />
        <div className="mt-10 grid gap-px bg-border border border-border md:grid-cols-3">
          {[
            { i: "01", t: t("find.step1.t"), b: t("find.step1.b") },
            { i: "02", t: t("find.step2.t"), b: t("find.step2.b") },
            { i: "03", t: t("find.step3.t"), b: t("find.step3.b") },
          ].map((s) => (
            <div key={s.i} className="bg-background p-8">
              <div className="font-mono text-accent text-sm tracking-[0.3em] mb-5">{s.i}</div>
              <h3 className="font-mono font-bold uppercase text-lg mb-3">{s.t}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
