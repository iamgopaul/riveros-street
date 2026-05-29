"use client";

import Link from "next/link";
import { REVIEWS, RATING, GOOGLE_REVIEWS_URL } from "@/lib/reviews";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1 text-accent" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "opacity-100" : "opacity-20"}>★</span>
      ))}
    </div>
  );
}

export function Reviews() {
  const { t } = useI18n();
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <SectionHeader index="//" label={t("reviews.eyebrow")} title={t("reviews.title")} />
          <div className="flex items-center gap-3">
            <span className="font-mono text-4xl gold-text">{RATING.average.toFixed(1)}</span>
            <Stars n={Math.round(RATING.average)} />
          </div>
        </div>

        <div className="grid gap-px bg-border border border-border md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="bg-background p-8 flex flex-col gap-5">
              <Stars n={r.rating} />
              <blockquote className="text-foreground/80 leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="text-xs uppercase tracking-[0.3em] text-foreground/45">
                {r.author}
                {r.date ? ` · ${r.date}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 h-14 border border-foreground/25 font-mono uppercase tracking-widest text-sm hover:border-accent hover:text-accent transition-colors"
          >
            {t("reviews.cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
