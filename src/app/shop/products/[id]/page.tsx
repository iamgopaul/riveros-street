import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
