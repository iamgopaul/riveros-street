import { MENU, itemId, type MenuItem } from "./menu";

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

/**
 * Recompute a single line's unit price from the authoritative MENU data,
 * ignoring any price the client sent. Unknown items/modifiers contribute 0 /
 * are skipped, so a tampered cart can't overcharge or undercharge.
 */
function unitPriceCents(line: PostedLine): number {
  const item = ITEM_BY_ID[line.itemId];
  if (!item) return 0;
  let dollars = item.price;
  for (const m of line.modifiers) {
    const group = item.options?.find((g) => g.key === m.groupKey);
    const choice = group?.choices.find((c) => c.label.en === m.labelEn);
    if (choice?.price) dollars += choice.price;
  }
  return Math.round(dollars * 100);
}

/** Authoritative order total in cents, validated against the MENU. */
export function computeTotalCents(lines: PostedLine[]): number {
  return lines.reduce((sum, l) => sum + unitPriceCents(l) * Math.max(1, Math.floor(l.qty)), 0);
}
