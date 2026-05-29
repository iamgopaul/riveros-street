import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata = {
  title: "Rivero's Street | Food Truck",
  description: "Comida venezolana callejera: arepas, empanadas, and cachapas. 30 Lowery Rd, Freeport, FL. Open daily from 11 AM.",
};

export default function EatLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Nav variant="eat" />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
