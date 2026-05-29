"use client";

import Link from "next/link";
import { MENU } from "@/lib/menu";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";

export default function MenuPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-center">
        <SectionHeader index="//" label={t("menu.eyebrow")} align="center" />
        <h1 className="mt-6 font-mono font-bold uppercase text-5xl sm:text-7xl leading-[0.95]">
          {t("menu.title.a")} <span className="gold-text spray">{t("menu.title.b")}</span>
        </h1>
        <p className="mt-8 text-foreground/60 max-w-xl mx-auto">{t("menu.lede")}</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28 space-y-20">
        {MENU.map((section) => (
          <div key={section.key}>
            <div className="flex items-baseline justify-between border-b border-accent pb-4 mb-8">
              <h2 className="font-mono font-bold uppercase text-3xl gold-text">{t(`menu.section.${section.key}`)}</h2>
              <span className="text-xs uppercase tracking-widest text-foreground/40">
                {section.items.length} {t("menu.plates")}
              </span>
            </div>
            <ul className="space-y-8">
              {section.items.map((item) => (
                <li key={item.name} className="grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <div className="font-mono uppercase text-lg">{item.name}</div>
                    <div className="text-foreground/60 mt-1">{item.description[lang]}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-accent text-lg">
                      ${item.price.toFixed(2).replace(/\.00$/, "")}
                    </div>
                    {item.priceNote && (
                      <div className="text-[11px] uppercase tracking-widest text-foreground/40 mt-1">
                        {item.priceNote[lang]}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-center pt-8">
          <Link
            href="/find"
            className="inline-flex items-center gap-3 px-8 h-14 bg-accent text-white font-mono uppercase tracking-widest text-sm hover:bg-accent-soft transition-colors"
          >
            {t("menu.reserve")} →
          </Link>
        </div>
      </section>
    </>
  );
}
