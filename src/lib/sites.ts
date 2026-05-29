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

/** True when all surfaces share one host (path-based demo), set via *_BASE. */
export const SINGLE_DOMAIN = !!(EAT_BASE || SHOP_BASE);

type Surface = "hub" | "eat" | "shop";

/**
 * Build a nav link to a surface (+ optional sub-path), correct for the host
 * mode. Single-domain → relative same-origin path (never localhost; lang
 * persists same-origin). Subdomain → absolute cross-host URL carrying ?lang.
 */
export function navHref(target: Surface, subPath: string, lang: string) {
  if (SINGLE_DOMAIN) {
    return `${surfaceBase(target)}${subPath}` || "/";
  }
  return withLang(`${SITES[target]}${subPath}`, lang);
}

/** Display label for a surface (clean path in demo, host in production). */
export const surfaceHost = (target: Surface) =>
  SINGLE_DOMAIN ? surfaceBase(target) || "/" : hostOf(SITES[target]);

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
