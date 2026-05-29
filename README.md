# Riveros Street

Black-themed Next.js monorepo serving three surfaces from one codebase:

| URL                          | Surface       |
| ---------------------------- | ------------- |
| `riverosstreet.com`          | Hub landing   |
| `eat.riverosstreet.com`      | Restaurant    |
| `shop.riverosstreet.com`     | Clothing label |

Routing is handled by [src/middleware.ts](src/middleware.ts), which rewrites
subdomain requests to `/eat/*` and `/shop/*` internally.

## Local development

```bash
npm install
npm run dev
```

Then open:

- Hub:        http://localhost:3000
- Restaurant: http://eat.localhost:3000
- Shop:       http://shop.localhost:3000

Modern browsers resolve `*.localhost` automatically — no `/etc/hosts` edits needed.

## Deploying to Vercel

1. `vercel link` and push the project.
2. In Vercel project settings → Domains, add:
   - `riverosstreet.com` (apex)
   - `www.riverosstreet.com` (redirect to apex)
   - `eat.riverosstreet.com`
   - `shop.riverosstreet.com`
3. At your DNS provider:
   - `A` record `@` → `76.76.21.21` (Vercel apex IP)
   - `CNAME` `www`  → `cname.vercel-dns.com`
   - `CNAME` `eat`  → `cname.vercel-dns.com`
   - `CNAME` `shop` → `cname.vercel-dns.com`
4. Vercel issues SSL certs automatically.

## Project structure

```
src/
  middleware.ts       subdomain → internal route rewrites
  app/
    layout.tsx        root shell (black bg, fonts, grain overlay)
    page.tsx          HUB landing
    eat/              RESTAURANT (eat.*)
      layout.tsx
      page.tsx
      menu/page.tsx
      reservations/page.tsx
      order/page.tsx
    shop/             CLOTHING (shop.*)
      layout.tsx
      page.tsx
      products/page.tsx
      products/[id]/page.tsx
  components/         shared Nav, Footer, Logo
  lib/                static menu + product data (Phase 1)
```

## Roadmap

- **Phase 1 (now)** — Scaffold, black/gold design, three surfaces with static
  data, subdomain routing, reservation form (UI only).
- **Phase 2** — Supabase (products, menu, reservations persist) + admin pages.
- **Phase 3** — Stripe checkout (clothing) + online ordering (restaurant).
