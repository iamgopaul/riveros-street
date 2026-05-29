import { PRODUCTS } from "@/lib/products";
import { CatalogClient } from "./CatalogClient";

export const metadata = { title: "All Products | Rivero's Street" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; cat?: string }>;
}) {
  const { filter, cat } = await searchParams;
  let products = PRODUCTS;
  if (filter === "new") products = products.filter((p) => p.isNew);
  if (filter === "trending") products = products.filter((p) => p.isTrending);
  if (cat) products = products.filter((p) => p.category.toLowerCase() === cat.toLowerCase());

  return <CatalogClient products={products} cat={cat} filter={filter} />;
}
