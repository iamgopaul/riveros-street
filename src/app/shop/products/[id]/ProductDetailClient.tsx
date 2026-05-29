"use client";

import { useState } from "react";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { ProductMedia } from "@/components/ProductMedia";
import { useI18n } from "@/lib/i18n";
import { shopPath } from "@/lib/sites";
import { useCart } from "@/lib/cart";

export function ProductDetailClient({ product }: { product: Product }) {
  const { t, lang } = useI18n();
  const { add, setOpen } = useCart();
  const sizes = product.category === "Accessories" ? [t("products.oneSize")] : ["S", "M", "L", "XL"];
  const [size, setSize] = useState(sizes[0]);
  const [qty, setQty] = useState(1);

  function addToBag() {
    add(
      {
        itemId: product.id,
        name: product.name,
        sectionKey: product.category,
        basePrice: product.price,
        modifiers: [
          { groupKey: "size", groupLabel: { en: "Size", es: "Talla" }, label: { en: size, es: size }, price: 0 },
        ],
        notes: "",
      },
      qty
    );
    setOpen(true);
  }

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
                  onClick={() => setSize(s)}
                  className={`min-w-14 h-12 px-4 border uppercase tracking-widest text-sm transition-colors ${
                    size === s
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-foreground/70 hover:border-accent hover:text-accent"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {!product.soldOut && (
            <div className="mt-10">
              <div className="text-xs uppercase tracking-widest text-accent mb-4">{t("order.qty")}</div>
              <div className="inline-flex items-center border border-border h-12">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-12 h-full flex items-center justify-center text-lg hover:text-accent transition-colors" aria-label={t("order.decrease")}>−</button>
                <span className="w-10 text-center font-mono tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-12 h-full flex items-center justify-center text-lg hover:text-accent transition-colors" aria-label={t("order.increase")}>+</button>
              </div>
            </div>
          )}

          <button
            disabled={product.soldOut}
            onClick={addToBag}
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
