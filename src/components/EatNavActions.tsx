"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { eatPath } from "@/lib/sites";
import { CartButton } from "./CartButton";

/** Top-right actions on the food-truck nav: "Order Now" + a cart button. */
export function EatNavActions() {
  const { t } = useI18n();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href={eatPath("/menu")}
        className="hidden sm:inline-flex items-center gap-2 h-10 px-4 bg-accent text-white font-mono uppercase tracking-widest text-[11px] hover:bg-accent-soft transition-colors"
      >
        {t("nav.orderNow")}
      </Link>
      <CartButton />
    </div>
  );
}
