import { MENU, itemId, type MenuItem } from "./menu";
import { PRODUCTS } from "./products";

/** A cart line as posted to the server (prices are NOT trusted from the client). */
export type PostedLine = {
  itemId: string;
  qty: number;
  /** selected modifiers, identified by group + English label */
  modifiers: { groupKey: string; labelEn: string }[];
};

const ITEM_BY_ID: Record<string, MenuItem> = Object.fromEntries(
  MENU.flatMap((s) => s.items).map((i) => [itemId(i.name), i])
);

const PRODUCT_BY_ID: Record<string, { price: number }> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, { price: p.price }])
);

/**
 * Recompute a single line's unit price from authoritative catalog data (menu
 * items or shop products), ignoring any price the client sent. Unknown
 * items/modifiers contribute 0, so a tampered cart can't change the total.
 */
function unitPriceCents(line: PostedLine): number {
  const item = ITEM_BY_ID[line.itemId];
  if (item) {
    let dollars = item.price;
    for (const m of line.modifiers) {
      const group = item.options?.find((g) => g.key === m.groupKey);
      const choice = group?.choices.find((c) => c.label.en === m.labelEn);
      if (choice?.price) dollars += choice.price;
    }
    return Math.round(dollars * 100);
  }
  // shop product — flat price; size/modifiers carry no upcharge
  const product = PRODUCT_BY_ID[line.itemId];
  if (product) return Math.round(product.price * 100);
  return 0;
}

/** Authoritative order total in cents, validated against the MENU. */
export function computeTotalCents(lines: PostedLine[]): number {
  return lines.reduce((sum, l) => sum + unitPriceCents(l) * Math.max(1, Math.floor(l.qty)), 0);
}
