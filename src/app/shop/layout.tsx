import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata = {
  title: "Rivero's Street | The Label",
  description: "Heavyweight cotton, raw selvedge, red details. Worn at the window, sold to the world.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider surface="shop">
      <Nav variant="shop" />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
