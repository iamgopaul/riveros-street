"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

/** Top-right actions on the food-truck nav: "Order Now" + a cart button. */
export function EatNavActions() {
  const { t } = useI18n();
  const { count, setOpen } = useCart();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/menu"
        className="hidden sm:inline-flex items-center gap-2 h-10 px-4 bg-accent text-white font-mono uppercase tracking-widest text-[11px] hover:bg-accent-soft transition-colors"
      >
        {t("nav.orderNow")}
      </Link>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("cart.title")}
        className="relative inline-flex items-center justify-center h-10 w-10 border border-foreground/20 hover:border-accent hover:text-accent transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.7">
          <path d="M3 5h2l1.6 10.4a1.5 1.5 0 0 0 1.5 1.3h8.3a1.5 1.5 0 0 0 1.5-1.2L20 8H6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-accent text-white text-[10px] font-mono font-bold tabular-nums">
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
