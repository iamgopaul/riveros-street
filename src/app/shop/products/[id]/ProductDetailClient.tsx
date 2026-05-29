"use client";

import Link from "next/link";
import { type Product } from "@/lib/products";
import { ProductMedia } from "@/components/ProductMedia";
import { useI18n } from "@/lib/i18n";
import { shopPath } from "@/lib/sites";

export function ProductDetailClient({ product }: { product: Product }) {
  const { t, lang } = useI18n();
  const sizes = product.category === "Accessories" ? [t("products.oneSize")] : ["S", "M", "L", "XL"];

  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <Link href={shopPath("/products")} className="text-xs uppercase tracking-widest text-accent link-shimmer">
        {t("products.back")}
      </Link>

      <div className="mt-10 grid gap-16 md:grid-cols-2">
        <div
          className="aspect-[3/4] border border-border relative overflow-hidden"
          style={{ background: product.swatch }}
        >
          <ProductMedia images={product.images} alt={product.name} sizes="(max-width:768px) 100vw, 50vw" priority />
          {product.isNew && (
            <div className="absolute top-4 left-4 px-3 py-1 text-[10px] font-mono uppercase tracking-widest tape text-white">{t("common.new")}</div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.4em] text-accent mb-4">{t(`cat.${product.category}`)}</div>
          <h1 className="font-mono font-bold uppercase text-4xl sm:text-5xl mb-6">{product.name}</h1>
          <div className="text-2xl font-mono text-accent mb-10">${product.price}</div>
          <p className="text-foreground/70 leading-relaxed max-w-md">{product.description[lang]}</p>

          <div className="mt-12">
            <div className="text-xs uppercase tracking-widest text-accent mb-4">{t("products.size")}</div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  className="min-w-14 h-12 px-4 border border-border hover:border-accent hover:text-accent uppercase tracking-widest text-sm transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={product.soldOut}
            className="mt-12 w-full h-14 bg-accent text-white font-mono uppercase tracking-widest text-sm hover:bg-accent-soft transition-colors disabled:bg-border disabled:text-foreground/40 disabled:cursor-not-allowed"
          >
            {product.soldOut ? t("common.soldOut") : t("products.add")}
          </button>

          <div className="mt-10 space-y-3 text-sm text-foreground/60 border-t border-border pt-8">
            <p>{t("products.ship")}</p>
            <p>{t("products.returns")}</p>
            <p>{t("products.small")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
