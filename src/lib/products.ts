export type Localized = { en: string; es: string };

export type Product = {
  id: string;
  name: string;
  category: "Outerwear" | "Tops" | "Bottoms" | "Accessories";
  price: number;
  description: Localized;
  isNew?: boolean;
  isTrending?: boolean;
  soldOut?: boolean;
  images?: string[]; // one or more paths under /public; multiple auto-slide
  swatch: string; // gradient fallback when there are no images
};

export const PRODUCTS: Product[] = [
  {
    id: "rs-legacy-tee",
    name: "Classic Street Legacy",
    category: "Tops",
    price: 32,
    description: {
      en: "Heavyweight cotton tee with the Rivero's Street legacy graphic.",
      es: "Camiseta de algodón pesado con el gráfico legacy de Rivero's Street.",
    },
    isNew: true,
    isTrending: true,
    images: ["/classic-street-legacy.webp"],
    swatch: "linear-gradient(135deg, #050505, #1a1a1a)",
  },
  {
    id: "rs-legacy-tee-white",
    name: "Classic Street Legacy (White)",
    category: "Tops",
    price: 32,
    description: {
      en: "Heavyweight white cotton tee with the Rivero's Street legacy graphic.",
      es: "Camiseta blanca de algodón pesado con el gráfico legacy de Rivero's Street.",
    },
    isNew: true,
    images: ["/classic-street-legacy-white1.webp", "/classic-street-legacy-white2.webp"],
    swatch: "linear-gradient(135deg, #f4efe4, #d8d2c4)",
  },
  {
    id: "rs-red-cap",
    name: "Red Street Cap",
    category: "Accessories",
    price: 25,
    description: {
      en: "Six-panel cap in street red with the Rivero's Street mark.",
      es: "Gorra de seis paneles en rojo calle con la marca de Rivero's Street.",
    },
    isNew: true,
    isTrending: true,
    images: ["/red-street-cap.webp"],
    swatch: "linear-gradient(135deg, #7a0d14, #e11d2a)",
  },
  {
    id: "rs-panda-cap",
    name: "Panda Cap",
    category: "Accessories",
    price: 25,
    description: {
      en: "Six-panel cap with the panda mark.",
      es: "Gorra de seis paneles con la marca del panda.",
    },
    isNew: true,
    images: ["/panda-cap.webp"],
    swatch: "linear-gradient(135deg, #0a0a0a, #2a2a2a)",
  },
];
