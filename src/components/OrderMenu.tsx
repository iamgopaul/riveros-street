"use client";

import { useEffect, useRef, useState } from "react";
import { MENU, type MenuItem, type MenuSection } from "@/lib/menu";
import { useCart, money } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { ItemTile } from "./ItemTile";
import { ItemModal } from "./ItemModal";

export function OrderMenu() {
  const { t, lang } = useI18n();
  const { count, subtotal, setOpen } = useCart();
  const [openItem, setOpenItem] = useState<{ item: MenuItem; sectionKey: MenuSection["key"] } | null>(null);
  const [activeKey, setActiveKey] = useState<MenuSection["key"]>(MENU[0].key);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // scrollspy — highlight the category currently in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveKey(visible.target.getAttribute("data-key") as MenuSection["key"]);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function go(key: string) {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* sticky category nav */}
      <div className="sticky top-[6.5rem] sm:top-[7rem] z-30 -mx-6 px-6 bg-background/90 backdrop-blur-md border-y border-border">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {MENU.map((s) => (
            <button
              key={s.key}
              onClick={() => go(s.key)}
              className={`whitespace-nowrap px-4 h-9 text-[11px] font-mono uppercase tracking-widest border transition-colors ${
                activeKey === s.key
                  ? "border-accent bg-accent text-white"
                  : "border-border text-foreground/60 hover:border-foreground/40"
              }`}
            >
              {t(`menu.section.${s.key}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-40 pt-10 space-y-16">
        {MENU.map((section) => (
          <section
            key={section.key}
            data-key={section.key}
            ref={(el) => {
              sectionRefs.current[section.key] = el;
            }}
            className="scroll-mt-44"
          >
            <h2 className="font-mono font-bold uppercase text-2xl sm:text-3xl gold-text mb-6">
              {t(`menu.section.${section.key}`)}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setOpenItem({ item, sectionKey: section.key })}
                  className="group border border-border text-left flex gap-4 p-4 hover:border-accent/50 hover:bg-white/[0.02] transition-colors"
                >
                  {item.image && (
                    <ItemTile name={item.name} sectionKey={section.key} image={item.image} className="w-24 h-24 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="font-mono uppercase text-base leading-tight group-hover:text-accent transition-colors">
                      {item.name}
                    </div>
                    <p className="text-xs text-foreground/55 mt-1 leading-snug line-clamp-2">{item.description[lang]}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="font-mono text-accent">{money(item.price)}</span>
                      <span className="inline-flex items-center justify-center h-8 px-3 border border-foreground/25 text-[10px] uppercase tracking-widest group-hover:border-accent group-hover:text-accent transition-colors">
                        {item.options?.length ? t("order.customize") : t("order.add")} +
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* floating view-order bar */}
      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4 pointer-events-none">
          <button
            onClick={() => setOpen(true)}
            className="pointer-events-auto mx-auto max-w-md w-full flex items-center justify-between gap-4 h-14 px-5 bg-accent text-white font-mono uppercase tracking-widest text-xs shadow-2xl hover:bg-accent-soft transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-full bg-white/20 tabular-nums">{count}</span>
              {t("order.viewOrder")}
            </span>
            <span className="tabular-nums">{money(subtotal)}</span>
          </button>
        </div>
      )}

      {openItem && (
        <ItemModal item={openItem.item} sectionKey={openItem.sectionKey} onClose={() => setOpenItem(null)} />
      )}
    </>
  );
}
