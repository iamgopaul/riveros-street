"use client";

import Link from "next/link";
import { type Product } from "@/lib/products";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductMedia } from "@/components/ProductMedia";
import { useI18n } from "@/lib/i18n";
import { shopPath } from "@/lib/sites";

const CATEGORIES = ["All", "Outerwear", "Tops", "Bottoms", "Accessories"] as const;

export function CatalogClient({
  products,
  cat,
  filter,
}: {
  products: Product[];
  cat?: string;
  filter?: string;
}) {
  const { t } = useI18n();
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <SectionHeader
        index="//"
        label={t("products.eyebrow")}
        title={
          filter === "new"
            ? t("products.titleNew")
            : filter === "trending"
            ? t("products.titleTrending")
            : t("products.titleAll")
        }
      />

      <div className="mt-12 flex flex-wrap gap-2 border-b border-border pb-6">
        {CATEGORIES.map((c) => {
          const active = (c === "All" && !cat) || cat?.toLowerCase() === c.toLowerCase();
          const href = c === "All" ? "/products" : `/products?cat=${c.toLowerCase()}`;
          return (
            <Link
              key={c}
              href={href}
              className={`px-4 h-9 inline-flex items-center text-xs uppercase tracking-widest border transition-colors ${
                active
                  ? "bg-accent text-white border-accent"
                  : "border-border text-foreground/70 hover:border-accent hover:text-accent"
              }`}
            >
              {t(`cat.${c}`)}
            </Link>
          );
        })}
      </div>

      <div className="mt-12 grid gap-px bg-border border border-border grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <Link key={p.id} href={shopPath(`/products/${p.id}`)} className="group block bg-background">
            <div className="aspect-[3/4] relative overflow-hidden" style={{ background: p.swatch }}>
              <ProductMedia images={p.images} alt={p.name} sizes="(max-width:1024px) 50vw, 25vw" priority={i === 0} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              {p.isNew && (
                <div className="absolute top-3 left-3 px-2 py-1 text-[10px] font-mono uppercase tracking-widest tape text-white">{t("common.new")}</div>
              )}
              {p.soldOut && (
                <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                  <span className="text-xs font-mono uppercase tracking-[0.4em] text-accent">{t("common.soldOut")}</span>
                </div>
              )}
            </div>
            <div className="p-4 flex items-baseline justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">{t(`cat.${p.category}`)}</div>
                <div className="font-mono uppercase mt-1 group-hover:text-accent transition-colors">{p.name}</div>
              </div>
              <div className="font-mono text-accent shrink-0 pl-3">${p.price}</div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-20 text-center text-foreground/50">{t("products.empty")}</p>
      )}
    </section>
  );
}
