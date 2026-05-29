"use client";

import { useEffect, useState } from "react";
import { useCart, money, lineTotal, type CartLine } from "@/lib/cart";
import { useI18n, type Lang } from "@/lib/i18n";
import { whatsappOrderUrl } from "@/lib/sites";
import { SquareCard, squareConfigured } from "./SquareCard";
import type { PostedLine } from "@/lib/order";

type Step = "cart" | "checkout" | "pay" | "done";

const PICKUP_OPTIONS: { key: string; label: { en: string; es: string } }[] = [
  { key: "asap", label: { en: "ASAP", es: "Lo antes posible" } },
  { key: "15", label: { en: "In 15 min", es: "En 15 min" } },
  { key: "30", label: { en: "In 30 min", es: "En 30 min" } },
  { key: "45", label: { en: "In 45 min", es: "En 45 min" } },
];

function buildMessage(
  lines: CartLine[],
  subtotal: number,
  lang: Lang,
  name: string,
  pickup: string,
  orderNotes: string,
  t: (k: string) => string
) {
  const body = lines
    .map((l) => {
      const mods = l.modifiers.map((m) => m.label[lang]).join(", ");
      let s = `• ${l.qty}× ${l.name} — ${money(lineTotal(l))}`;
      if (mods) s += `\n   ${mods}`;
      if (l.notes) s += `\n   “${l.notes}”`;
      return s;
    })
    .join("\n");
  let msg = `🛵 ${t("order.wa.header")}\n\n${body}\n\n${t("order.subtotal")}: ${money(subtotal)}`;
  msg += `\n${t("checkout.name")}: ${name}`;
  msg += `\n${t("checkout.pickup")}: ${pickup}`;
  if (orderNotes.trim()) msg += `\n${t("order.notes")}: ${orderNotes.trim()}`;
  return msg;
}

function LineRow({ line }: { line: CartLine }) {
  const { lang } = useI18n();
  const { setQty } = useCart();
  const mods = line.modifiers.map((m) => m.label[lang]).join(" · ");
  return (
    <div className="py-4 border-b border-border flex gap-3">
      <div className="flex-1 min-w-0">
        <div className="font-mono uppercase text-sm">{line.name}</div>
        {mods && <div className="text-xs text-foreground/50 mt-1 leading-snug">{mods}</div>}
        {line.notes && <div className="text-xs text-foreground/40 italic mt-1">“{line.notes}”</div>}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-border h-8">
            <button
              onClick={() => setQty(line.uid, line.qty - 1)}
              className="w-8 h-full flex items-center justify-center hover:text-accent transition-colors"
              aria-label="−"
            >
              −
            </button>
            <span className="w-7 text-center text-sm font-mono tabular-nums">{line.qty}</span>
            <button
              onClick={() => setQty(line.uid, line.qty + 1)}
              className="w-8 h-full flex items-center justify-center hover:text-accent transition-colors"
              aria-label="+"
            >
              +
            </button>
          </div>
          <button
            onClick={() => setQty(line.uid, 0)}
            className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="font-mono text-accent text-sm shrink-0">{money(lineTotal(line))}</div>
    </div>
  );
}

export function CartDrawer() {
  const { t, lang } = useI18n();
  const { lines, count, subtotal, open, setOpen, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState(PICKUP_OPTIONS[0].label[lang]);
  const [orderNotes, setOrderNotes] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [payRef, setPayRef] = useState("");
  const [paid, setPaid] = useState(false);

  // cart lines reshaped for the server (prices validated there, not trusted)
  const postedLines: PostedLine[] = lines.map((l) => ({
    itemId: l.itemId,
    qty: l.qty,
    modifiers: l.modifiers.map((m) => ({ groupKey: m.groupKey, labelEn: m.label.en })),
  }));
  const orderNote = `${buildMessage(lines, subtotal, lang, name.trim() || "—", pickup, orderNotes, t)}\n${t("order.ref")}: ${payRef}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset to the cart step whenever it's reopened after a completed order.
  useEffect(() => {
    if (open && step === "done") setStep("cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function sendOrder() {
    const ref = "RS-" + String(Date.now()).slice(-5);
    const msg = buildMessage(lines, subtotal, lang, name.trim() || "—", pickup, orderNotes, t);
    setOrderRef(ref);
    setPaid(false);
    window.open(whatsappOrderUrl(`${msg}\n${t("order.ref")}: ${ref}`), "_blank", "noopener");
    clear();
    setStep("done");
  }

  function goPay() {
    setPayRef("RS-" + String(Date.now()).slice(-5));
    setStep("pay");
  }

  function onPaid() {
    setOrderRef(payRef);
    setPaid(true);
    clear();
    setStep("done");
  }

  return (
    <div
      className={`fixed inset-0 z-[55] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* scrim */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      {/* panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-background border-l border-border flex flex-col transition-transform duration-300 pb-[env(safe-area-inset-bottom)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-1 w-full hazard-thin" />
        <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
          <h2 className="font-mono font-bold uppercase tracking-widest text-sm">
            {step === "cart" && t("cart.title")}
            {step === "checkout" && t("checkout.title")}
            {step === "pay" && t("pay.title")}
            {step === "done" && t("checkout.done.title")}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label={t("common.close")}
            className="h-9 w-9 flex items-center justify-center border border-border hover:text-accent transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ── CART STEP ── */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              {count === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-20">
                  <div className="text-5xl opacity-20">🛒</div>
                  <p className="text-foreground/50 text-sm">{t("cart.empty")}</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 text-accent uppercase tracking-widest text-xs link-shimmer"
                  >
                    {t("cart.browse")} →
                  </button>
                </div>
              ) : (
                lines.map((l) => <LineRow key={l.uid} line={l} />)
              )}
            </div>
            {count > 0 && (
              <div className="border-t border-border p-6 space-y-4 shrink-0">
                <div className="flex items-center justify-between font-mono uppercase text-sm">
                  <span className="text-foreground/60">{t("order.subtotal")}</span>
                  <span className="text-accent text-lg">{money(subtotal)}</span>
                </div>
                <p className="text-[11px] text-foreground/40 leading-relaxed">{t("checkout.payNote")}</p>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full h-14 bg-accent text-white font-mono uppercase tracking-widest text-xs hover:bg-accent-soft transition-colors"
                >
                  {t("cart.checkout")} →
                </button>
              </div>
            )}
          </>
        )}

        {/* ── CHECKOUT STEP ── */}
        {step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
              <div>
                <label className="font-mono uppercase text-xs tracking-[0.3em] text-accent">{t("checkout.name")}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("checkout.namePlaceholder")}
                  className="mt-3 w-full bg-black/30 border border-border px-4 h-12 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <span className="font-mono uppercase text-xs tracking-[0.3em] text-accent">{t("checkout.pickup")}</span>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {PICKUP_OPTIONS.map((o) => {
                    const label = o.label[lang];
                    const sel = pickup === label;
                    return (
                      <button
                        key={o.key}
                        onClick={() => setPickup(label)}
                        className={`h-11 border text-xs uppercase tracking-widest transition-colors ${
                          sel ? "border-accent bg-accent/10 text-foreground" : "border-border text-foreground/60 hover:border-foreground/40"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="font-mono uppercase text-xs tracking-[0.3em] text-accent">{t("order.notes")}</label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={2}
                  placeholder={t("checkout.notesPlaceholder")}
                  className="mt-3 w-full bg-black/30 border border-border px-4 py-3 text-sm focus:border-accent focus:outline-none resize-none"
                />
              </div>

              {/* order summary */}
              <div className="border-t border-border pt-5 space-y-2">
                {lines.map((l) => (
                  <div key={l.uid} className="flex justify-between text-xs text-foreground/60">
                    <span>{l.qty}× {l.name}</span>
                    <span className="font-mono">{money(lineTotal(l))}</span>
                  </div>
                ))}
                <div className="flex justify-between font-mono uppercase text-sm pt-2">
                  <span className="text-foreground/60">{t("order.subtotal")}</span>
                  <span className="text-accent">{money(subtotal)}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-border p-6 space-y-3 shrink-0">
              {squareConfigured && (
                <button
                  onClick={goPay}
                  className="w-full h-14 bg-accent text-white font-mono uppercase tracking-widest text-xs hover:bg-accent-soft transition-colors flex items-center justify-center gap-2"
                >
                  {t("pay.payNow")} · {money(subtotal)}
                </button>
              )}
              <button
                onClick={sendOrder}
                className={`w-full h-14 font-mono uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 ${
                  squareConfigured
                    ? "border border-foreground/25 hover:border-accent hover:text-accent"
                    : "bg-accent text-white hover:bg-accent-soft"
                }`}
              >
                {t("checkout.send")} →
              </button>
              <button
                onClick={() => setStep("cart")}
                className="w-full text-center text-[11px] uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors"
              >
                ← {t("checkout.back")}
              </button>
            </div>
          </>
        )}

        {/* ── PAY STEP (Square card) ── */}
        {step === "pay" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div className="space-y-2">
                {lines.map((l) => (
                  <div key={l.uid} className="flex justify-between text-xs text-foreground/60">
                    <span>{l.qty}× {l.name}</span>
                    <span className="font-mono">{money(lineTotal(l))}</span>
                  </div>
                ))}
                <div className="flex justify-between font-mono uppercase text-sm pt-2 border-t border-border">
                  <span className="text-foreground/60">{t("checkout.total")}</span>
                  <span className="text-accent text-lg">{money(subtotal)}</span>
                </div>
              </div>
              <div>
                <h3 className="font-mono uppercase text-xs tracking-[0.3em] text-accent mb-3">{t("pay.card")}</h3>
                <SquareCard lines={postedLines} note={orderNote} amountLabel={money(subtotal)} onPaid={onPaid} />
                <p className="mt-3 text-[11px] text-foreground/40 leading-relaxed">{t("pay.secure")}</p>
              </div>
            </div>
            <div className="border-t border-border p-6 shrink-0">
              <button
                onClick={() => setStep("checkout")}
                className="w-full text-center text-[11px] uppercase tracking-widest text-foreground/40 hover:text-accent transition-colors"
              >
                ← {t("checkout.back")}
              </button>
            </div>
          </>
        )}

        {/* ── DONE STEP ── */}
        {step === "done" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
            <div className="h-16 w-16 rounded-full border-2 border-accent flex items-center justify-center text-accent text-3xl">✓</div>
            <h3 className="font-mono font-bold uppercase text-2xl">{t("checkout.done.title")}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-xs">{paid ? t("pay.done.body") : t("checkout.done.body")}</p>
            <div className="font-mono text-accent tracking-widest">{orderRef}</div>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 h-12 px-8 border border-foreground/25 font-mono uppercase tracking-widest text-xs hover:border-accent hover:text-accent transition-colors"
            >
              {t("checkout.done.close")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
