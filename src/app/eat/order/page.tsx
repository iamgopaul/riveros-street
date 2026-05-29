"use client";

import Link from "next/link";
import { MENU } from "@/lib/menu";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";

export default function OrderPage() {
  const { t, lang } = useI18n();
  return (
    <section className="max-w-5xl mx-auto px-6 py-28">
      <SectionHeader index="//" label={t("order.eyebrow")} align="center" />
      <h1 className="mt-6 font-mono font-bold uppercase text-5xl sm:text-7xl leading-[0.95] text-center">
        {t("order.title.a")} <span className="gold-text spray">{t("order.title.b")}</span>
      </h1>
      <p className="mt-8 text-center text-foreground/60 max-w-lg mx-auto">{t("order.lede")}</p>

      <div className="mt-16 grid gap-px bg-border border border-border md:grid-cols-2">
        {MENU.flatMap((section) =>
          section.items.map((item) => (
            <div key={item.name} className="group bg-background p-8">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.4em] text-accent">{t(`menu.section.${section.key}`)}</span>
                <span className="font-mono text-accent">${item.price}</span>
              </div>
              <div className="font-mono uppercase text-2xl mb-2">{item.name}</div>
              <p className="text-foreground/60">{item.description[lang]}</p>
              <button
                disabled
                className="mt-6 w-full h-12 border border-border text-foreground/40 uppercase tracking-widest text-xs cursor-not-allowed"
              >
                {t("order.add")}
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-16 text-center">
        <Link href="/menu" className="text-accent uppercase tracking-widest text-sm link-shimmer">
          {t("order.back")}
        </Link>
      </div>
    </section>
  );
}
