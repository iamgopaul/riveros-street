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
