"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/** One selected modifier choice, captured at add-to-cart time. */
export type SelectedModifier = {
  groupKey: string;
  groupLabel: { en: string; es: string };
  label: { en: string; es: string };
  price: number;
};

export type CartLine = {
  /** stable key for this exact configuration (item + modifiers + notes) */
  uid: string;
  itemId: string;
  name: string;
  sectionKey: string;
  basePrice: number;
  modifiers: SelectedModifier[];
  notes: string;
  qty: number;
};

/** Format a dollar amount, dropping the cents when whole ($16, $4.50). */
export const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;

/** Per-unit price = base + every selected modifier delta. */
export const unitPrice = (line: Pick<CartLine, "basePrice" | "modifiers">) =>
  line.basePrice + line.modifiers.reduce((sum, m) => sum + m.price, 0);

export const lineTotal = (line: CartLine) => unitPrice(line) * line.qty;

/** Signature that makes identical configurations merge into one line. */
function signature(l: Omit<CartLine, "uid" | "qty">) {
  const mods = l.modifiers
    .map((m) => `${m.groupKey}:${m.label.en}`)
    .sort()
    .join("|");
  return `${l.itemId}#${mods}#${l.notes.trim().toLowerCase()}`;
}

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** add a configured line (merges with an identical existing one) */
  add: (line: Omit<CartLine, "uid" | "qty">, qty?: number) => void;
  setQty: (uid: string, qty: number) => void;
  remove: (uid: string) => void;
  clear: () => void;
  /** drawer open state lives here so the nav button + pages share it */
  open: boolean;
  setOpen: (o: boolean) => void;
};

const CartContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "rs_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so we never clobber storage with the empty initial state.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage full / unavailable */
    }
  }, [lines, hydrated]);

  const add = useCallback((line: Omit<CartLine, "uid" | "qty">, qty = 1) => {
    const sig = signature(line);
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.uid === sig);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...line, uid: sig, qty }];
    });
  }, []);

  const setQty = useCallback((uid: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.uid !== uid)
        : prev.map((l) => (l.uid === uid ? { ...l, qty } : l))
    );
  }, []);

  const remove = useCallback((uid: string) => {
    setLines((prev) => prev.filter((l) => l.uid !== uid));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((s, l) => s + lineTotal(l), 0), [lines]);

  const value: Ctx = { lines, count, subtotal, add, setQty, remove, clear, open, setOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): Ctx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
