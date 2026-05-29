"use client";

import Link from "next/link";
import { PRODUCTS, type Product } from "@/lib/products";
import { SectionHeader } from "@/components/SectionHeader";
import { Palm } from "@/components/Palm";
import { ProductMedia } from "@/components/ProductMedia";
import { useI18n } from "@/lib/i18n";

export default function ShopHome() {
  const { t } = useI18n();
  const featured = PRODUCTS.slice(0, 4);
  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Hero background image with a scrim that fades into the page */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url(/riverowear-bg.webp)" }}
        />
        <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/55 via-background/50 to-background" />
        <Palm flip className="absolute -right-12 bottom-0 w-56 h-auto text-accent/10" />
        <div className="absolute inset-0 flex items-center justify-end">
          <span className="watermark text-[26vw] leading-none pr-[2vw]">SS26</span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className="tick text-[11px] uppercase tracking-[0.4em] text-foreground/60 mb-10 float-up">
            <span className="font-mono text-accent">{t("shop.ss26")}</span>
            <span>{t("shop.volume")}</span>
          </div>
          <h1 className="float-up font-mono font-bold uppercase tracking-tight text-[14vw] lg:text-[10rem] leading-[0.82]">
            <span className="block">{t("shop.h1.a")}</span>
            <span className="block stencil-outline">{t("shop.h1.b")}</span>
            <span className="block gold-text spray">{t("shop.h1.c")}</span>
          </h1>
          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-md text-foreground/70 text-lg leading-relaxed">{t("shop.lede")}</p>
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-8 h-14 bg-accent text-white font-mono uppercase tracking-widest text-sm hover:bg-accent-soft transition-colors"
            >
              {t("shop.shopDrop")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="h-2 hazard" />

      {/* ── FEATURED GRID ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader index="//" label={t("shop.featured")} title={t("shop.newIn")} />
          <Link href="/products" className="font-mono text-sm uppercase tracking-widest text-accent link-shimmer shrink-0">
            {t("shop.viewAll")} →
          </Link>
        </div>
        <div className="grid gap-px bg-border border border-border grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} priority={i === 0} />)}
        </div>
      </section>

      {/* ── THE LABEL ──────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-28 text-center">
          <SectionHeader index="//" label={t("shop.label")} align="center" />
          <h2 className="mt-6 font-mono font-bold uppercase text-4xl sm:text-6xl leading-[0.95]">
            {t("shop.label.title1")}<br />
            <span className="stencil-outline">{t("shop.label.title2")}</span>
          </h2>
          <p className="mt-8 text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("shop.label.body")}
          </p>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { t } = useI18n();
  return (
    <Link href={`/products/${product.id}`} className="group block bg-background">
      <div className="aspect-[3/4] relative overflow-hidden" style={{ background: product.swatch }}>
        <ProductMedia images={product.images} alt={product.name} sizes="(max-width:1024px) 50vw, 25vw" priority={priority} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        {product.isNew && (
          <div className="absolute top-3 left-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest tape text-white">{t("common.new")}</div>
        )}
        {product.soldOut && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-accent">{t("common.soldOut")}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">{t(`cat.${product.category}`)}</div>
          <div className="font-mono uppercase mt-1 group-hover:text-accent transition-colors">{product.name}</div>
        </div>
        <div className="font-mono text-accent shrink-0 pl-3">${product.price}</div>
      </div>
    </Link>
  );
}
