/**
 * Cross-surface URLs. Defaults target local dev (port 6001); override per
 * environment with NEXT_PUBLIC_HUB_URL / _EAT_URL / _SHOP_URL on Vercel.
 */
export const SITES = {
  hub: process.env.NEXT_PUBLIC_HUB_URL ?? "http://localhost:6001",
  eat: process.env.NEXT_PUBLIC_EAT_URL ?? "http://eat.localhost:6001",
  shop: process.env.NEXT_PUBLIC_SHOP_URL ?? "http://shop.localhost:6001",
} as const;

/** Strip the protocol for display, e.g. "eat.localhost:6001". */
export const hostOf = (url: string) => url.replace(/^https?:\/\//, "");

/**
 * Surface base path for internal links.
 * - Subdomain hosting (production): empty — links are root-relative ("/menu")
 *   and `proxy.ts` rewrites them under /eat or /shop based on the host.
 * - Single-domain demo (one *.vercel.app host): set NEXT_PUBLIC_EAT_BASE=/eat
 *   and NEXT_PUBLIC_SHOP_BASE=/shop so links resolve to the real routes.
 */
export const EAT_BASE = process.env.NEXT_PUBLIC_EAT_BASE ?? "";
export const SHOP_BASE = process.env.NEXT_PUBLIC_SHOP_BASE ?? "";

export const surfaceBase = (v: "hub" | "eat" | "shop") =>
  v === "eat" ? EAT_BASE : v === "shop" ? SHOP_BASE : "";

/** Prefix an in-surface path with its base (e.g. eatPath("/menu")). */
export const eatPath = (p: string) => `${EAT_BASE}${p}`;
export const shopPath = (p: string) => `${SHOP_BASE}${p}`;

/** Append the current language so it carries across subdomains. */
export const withLang = (url: string, lang: string) =>
  `${url}${url.includes("?") ? "&" : "?"}lang=${lang}`;

/** Contact details. */
export const PHONE_DISPLAY = "(321) 337-8997";
export const PHONE_TEL = "tel:+13213378997";

/** Digits-only number used for WhatsApp / SMS order links. */
export const ORDER_PHONE = "13213378997";

/** Build a WhatsApp deep link with a pre-filled message. */
export const whatsappOrderUrl = (message: string) =>
  `https://wa.me/${ORDER_PHONE}?text=${encodeURIComponent(message)}`;

/** SMS fallback. */
export const smsOrderUrl = (message: string) =>
  `sms:+${ORDER_PHONE}?&body=${encodeURIComponent(message)}`;
