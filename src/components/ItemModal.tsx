"use client";

import { useEffect, useMemo, useState } from "react";
import type { MenuItem, MenuSection } from "@/lib/menu";
import { useCart, money, type SelectedModifier } from "@/lib/cart";
import { itemId } from "@/lib/menu";
import { useI18n } from "@/lib/i18n";
import { ItemTile } from "./ItemTile";

/**
 * Customization sheet for one menu item: choose size / add-ons / sauce, set a
 * quantity and notes, see the live price, then add to the cart.
 */
export function ItemModal({
  item,
  sectionKey,
  onClose,
}: {
  item: MenuItem;
  sectionKey: MenuSection["key"];
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const { add, setOpen } = useCart();
  const groups = item.options ?? [];

  // single groups default to their first choice; multi groups start empty.
  const [single, setSingle] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    groups.forEach((g) => {
      if (g.type === "single" && !g.optional) init[g.key] = 0;
    });
    return init;
  });
  const [multi, setMulti] = useState<Record<string, Set<number>>>({});
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  // close on Escape + lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const modifiers: SelectedModifier[] = useMemo(() => {
    const out: SelectedModifier[] = [];
    groups.forEach((g) => {
      if (g.type === "single") {
        const idx = single[g.key];
        if (idx != null && g.choices[idx]) {
          const c = g.choices[idx];
          out.push({ groupKey: g.key, groupLabel: g.label, label: c.label, price: c.price ?? 0 });
        }
      } else {
        (multi[g.key] ?? new Set()).forEach((idx) => {
          const c = g.choices[idx];
          if (c) out.push({ groupKey: g.key, groupLabel: g.label, label: c.label, price: c.price ?? 0 });
        });
      }
    });
    return out;
  }, [groups, single, multi]);

  const unit = item.price + modifiers.reduce((s, m) => s + m.price, 0);

  function addToCart() {
    add(
      {
        itemId: itemId(item.name),
        name: item.name,
        sectionKey,
        basePrice: item.price,
        modifiers,
        notes: notes.trim(),
      },
      qty
    );
    onClose();
    setOpen(true);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[92svh] sm:max-h-[88svh] flex flex-col bg-background border border-border sm:border shadow-2xl">
        {/* header */}
        {item.image ? (
          <div className="relative">
            <ItemTile name={item.name} sectionKey={sectionKey} image={item.image} className="h-40 w-full" />
            <button
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center bg-background/80 backdrop-blur border border-border hover:text-accent transition-colors"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="flex justify-end p-3 border-b border-border">
            <button
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className="h-9 w-9 flex items-center justify-center border border-border hover:text-accent transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono font-bold uppercase text-2xl leading-tight">{item.name}</h2>
              <span className="font-mono text-accent text-lg shrink-0">{money(item.price)}</span>
            </div>
            <p className="mt-2 text-foreground/60 text-sm leading-relaxed">{item.description[lang]}</p>
          </div>

          {groups.map((g) => {
            const selected = multi[g.key] ?? new Set<number>();
            const atMax = g.type === "multi" && g.max != null && selected.size >= g.max;
            return (
              <div key={g.key}>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-mono uppercase text-xs tracking-[0.3em] text-accent">{g.label[lang]}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-foreground/40">
                    {g.type === "single"
                      ? g.optional ? t("order.optional") : t("order.required")
                      : g.max ? t("order.pickUpTo").replace("{n}", String(g.max)) : t("order.optional")}
                  </span>
                </div>
                <div className="grid gap-2">
                  {g.choices.map((c, idx) => {
                    const isSel =
                      g.type === "single" ? single[g.key] === idx : selected.has(idx);
                    const disabled = g.type === "multi" && !isSel && atMax;
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          if (g.type === "single") {
                            setSingle((s) => ({
                              ...s,
                              [g.key]: g.optional && s[g.key] === idx ? -1 : idx,
                            }));
                          } else {
                            setMulti((m) => {
                              const next = new Set(m[g.key] ?? new Set<number>());
                              if (next.has(idx)) next.delete(idx);
                              else if (!atMax) next.add(idx);
                              return { ...m, [g.key]: next };
                            });
                          }
                        }}
                        className={`flex items-center justify-between gap-3 h-12 px-4 border text-left transition-colors ${
                          isSel
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border text-foreground/70 hover:border-foreground/40"
                        } ${disabled ? "opacity-35 cursor-not-allowed" : ""}`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center justify-center w-4 h-4 border ${
                              g.type === "single" ? "rounded-full" : ""
                            } ${isSel ? "border-accent bg-accent text-white" : "border-foreground/40"}`}
                          >
                            {isSel && <span className="text-[9px] leading-none">✓</span>}
                          </span>
                          <span className="text-sm uppercase tracking-wide">{c.label[lang]}</span>
                        </span>
                        {c.price ? (
                          <span className="font-mono text-xs text-accent shrink-0">+{money(c.price)}</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* notes */}
          <div>
            <h3 className="font-mono uppercase text-xs tracking-[0.3em] text-accent mb-3">{t("order.notes")}</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder={t("order.notesPlaceholder")}
              className="w-full bg-black/30 border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* footer: qty + add */}
        <div className="border-t border-border p-4 flex items-center gap-4">
          <div className="flex items-center border border-border h-12 shrink-0">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-11 h-full flex items-center justify-center text-lg hover:text-accent transition-colors"
              aria-label={t("order.decrease")}
            >
              −
            </button>
            <span className="w-8 text-center font-mono tabular-nums">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-11 h-full flex items-center justify-center text-lg hover:text-accent transition-colors"
              aria-label={t("order.increase")}
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={addToCart}
            className="flex-1 h-12 bg-accent text-white font-mono uppercase tracking-widest text-xs hover:bg-accent-soft transition-colors flex items-center justify-between px-5"
          >
            <span>{t("order.add")}</span>
            <span className="tabular-nums">{money(unit * qty)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
