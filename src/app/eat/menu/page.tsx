"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { OrderMenu } from "@/components/OrderMenu";
import { useI18n } from "@/lib/i18n";
import { HOURS } from "@/lib/hours";

export default function MenuPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-10 text-center">
        <SectionHeader index="//" label={t("menu.eyebrow")} align="center" />
        <h1 className="mt-6 font-mono font-bold uppercase text-5xl sm:text-7xl leading-[0.95]">
          {t("menu.title.a")} <span className="gold-text spray">{t("menu.title.b")}</span>
        </h1>
        <p className="mt-6 text-foreground/60 max-w-lg mx-auto">{t("order.lede")}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/50">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          {t("order.pickupOnly")} · {HOURS[0].time}
        </div>
      </section>

      <OrderMenu />
    </>
  );
}
