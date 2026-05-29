"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Lang = "en" | "es";

type Dict = Record<string, string>;

const EN: Dict = {
  // nav
  "nav.home": "Home",
  "nav.restaurant": "Food Truck",
  "nav.shop": "Shop",
  "nav.media": "Media",
  "nav.about": "About",
  "nav.story": "Story",
  "nav.contact": "Contact",
  "nav.menu": "Menu",
  "nav.reservations": "Find Us",
  "nav.order": "Order",
  "nav.visit": "Find Us",
  "nav.all": "All",
  "nav.new": "New",
  "nav.trending": "Trending",
  "nav.reserve": "Find Us",
  "nav.bookTable": "Find the Truck",

  // common
  "common.new": "New",
  "common.soldOut": "Sold Out",

  // days
  "day.mon": "Monday",
  "day.tue": "Tuesday",
  "day.wed": "Wednesday",
  "day.thu": "Thursday",
  "day.fri": "Friday",
  "day.sat": "Saturday",
  "day.sun": "Sunday",

  // footer
  "footer.tagline": "One address, two appetites. A Venezuelan food truck and a clothing label sharing the same corner of Freeport, Florida.",
  "footer.visit": "Find Us",
  "footer.follow": "Follow",
  "footer.address": "30 Lowery Rd, Unit B · Freeport, FL",
  "footer.hours": "Open daily, 11 AM to 10 PM (Fri & Sat to 11 PM)",
  "footer.newsletter": "Newsletter",
  "footer.rights": "Eat · Wear · Live",

  // hub hero
  "hub.est": "EST. 2026",
  "hub.oneAddress": "30 Lowery Rd, Freeport, FL",
  "hub.h1.a": "Eat.",
  "hub.h1.b": "Wear.",
  "hub.h1.c": "Live.",
  "hub.lede": "A Venezuelan food truck and a clothing label, together on one corner of Freeport. Arepas straight off the grill, and a wardrobe made for the street.",
  "hub.twoHouses": "Two Houses",
  "hub.twoHouses.title": "One street. Two appetites.",
  "hub.house1.tag": "The Truck",
  "hub.house1.title": "The Food Truck",
  "hub.house1.body": "Comida venezolana callejera. Arepas, empanadas, and cachapas made by hand and served fresh from the window, open every day from 11 AM.",
  "hub.house2.tag": "The Closet",
  "hub.house2.title": "The Label",
  "hub.house2.body": "Pieces made in limited numbers. Heavyweight cotton, raw selvedge, and signature red detailing. Worn at the window, shipped worldwide.",
  "hub.findUs": "Find Us",
  "hub.come": "Walk up.",
  "hub.stay": "Order at the window.",
  "hub.detail.address": "Address",
  "hub.detail.hours": "Hours",
  "hub.detail.order": "Order",
  "hub.strip.cuisine": "Kitchen",
  "hub.strip.where": "30 Lowery Rd · Freeport, FL",
  "hub.strip.hours": "Mon to Fri, 11 AM to 10 PM\nSat & Sun, 11 AM to 11 PM",

  // eat home
  "eat.kitchen": "Comida Venezolana Callejera",
  "eat.openLate": "Open Daily from 11 AM",
  "eat.h1.a": "Arepas,",
  "eat.h1.b": "Empanadas,",
  "eat.h1.c": "& más.",
  "eat.lede": "Authentic Venezuelan street food, cooked to order at 30 Lowery Road. Arepas split and stuffed fresh, empanadas fried golden, cachapas folded around warm hand cheese.",
  "eat.reserve": "Find Us",
  "eat.menu": "Menu",
  "eat.order": "Order",
  "eat.houseRules": "Our Promise",
  "eat.houseRules.title": "How we cook.",
  "eat.pillar1.title": "Made by Hand",
  "eat.pillar1.body": "Every arepa is pressed and grilled to order, never left waiting under a lamp.",
  "eat.pillar2.title": "Criollo Roots",
  "eat.pillar2.body": "Family recipes from Venezuela: pabellón, reina pepiada, and the classics done right.",
  "eat.pillar3.title": "Fresh & Fast",
  "eat.pillar3.body": "Order at the window and enjoy it the moment it leaves the grill.",
  "eat.visit": "Find Us",
  "eat.visit.title1": "30 Lowery",
  "eat.visit.title2": "Road.",
  "eat.bookTable": "Find the Truck",

  // menu page
  "menu.eyebrow": "Comida Venezolana",
  "menu.title.a": "What we're",
  "menu.title.b": "cooking.",
  "menu.lede": "Made by hand, fresh off the grill. Here is what we are serving today.",
  "menu.plates": "items",
  "menu.reserve": "Find the Truck",
  "menu.section.appetizers": "Appetizers",
  "menu.section.arepas": "Arepas",
  "menu.section.buildYourOwn": "Build Your Own",
  "menu.section.pepitos": "Pepitos",
  "menu.section.burgers": "Burgers",
  "menu.section.cachapas": "Cachapas",
  "menu.section.patacones": "Patacones",
  "menu.section.sides": "Sides",
  "menu.section.kids": "Kids Menu",
  "menu.section.loadedFries": "Loaded Fries",
  "menu.section.beverages": "Beverages",

  // find us
  "find.eyebrow": "Find Us",
  "find.title.a": "Find the",
  "find.title.b": "Truck.",
  "find.lede": "You will find us at 30 Lowery Road in Freeport. Walk up, order at the window, and enjoy.",
  "find.addressLabel": "Address",
  "find.hoursLabel": "Hours",
  "find.phoneLabel": "Phone",
  "find.directions": "Get Directions",
  "find.orderCta": "Order to Go",
  "find.call": "Call the Truck",

  // order
  "order.eyebrow": "Order to Go",
  "order.title.a": "Pickup at the",
  "order.title.b": "window.",
  "order.lede": "Browse the menu and build your order. Online checkout is coming soon; for now, order fresh at the window.",
  "order.add": "Add to Order (Coming Soon)",
  "order.back": "Back to Menu",

  // reviews
  "reviews.eyebrow": "What People Say",
  "reviews.title": "Straight from our guests.",
  "reviews.cta": "Read all reviews on Google",
  "reviews.count": "Google reviews",

  // shop home
  "shop.ss26": "SS26",
  "shop.volume": "Volume One · Drop 01",
  "shop.h1.a": "Worn at",
  "shop.h1.b": "the window.",
  "shop.h1.c": "Sold worldwide.",
  "shop.lede": "Twelve pieces in heavyweight cotton and raw selvedge, finished with signature red detailing. Made in limited numbers; once they are gone, they are gone.",
  "shop.shopDrop": "Shop the Drop",
  "shop.featured": "Featured",
  "shop.newIn": "New In",
  "shop.viewAll": "View All",
  "shop.label": "The Label",
  "shop.label.title1": "Born at the truck.",
  "shop.label.title2": "Made for the street.",
  "shop.label.body": "Every piece is worn behind the window before it ever reaches the rack. If it cannot handle a Saturday rush, it does not make the cut.",

  // products
  "products.eyebrow": "The Collection",
  "products.titleNew": "New In.",
  "products.titleTrending": "Trending.",
  "products.titleAll": "All Pieces.",
  "products.empty": "Nothing here just yet. Please check back soon.",
  "products.back": "All Products",
  "products.size": "Size",
  "products.oneSize": "One Size",
  "products.add": "Add to Bag (Coming Soon)",
  "products.ship": "Free shipping on orders over $200",
  "products.returns": "Easy returns within 30 days",
  "products.small": "Made in limited numbers",

  // about
  "about.eyebrow": "About Us",
  "about.title.a": "From Caracas",
  "about.title.b": "to Freeport.",
  "about.lede": "Rivero's Street began with a single window, a flat-top grill, and a family recipe book. Today it is a Venezuelan food truck and a clothing label sharing the same corner.",
  "about.body1": "Everything we serve is comida criolla, the street food we grew up on. Arepas pressed and grilled to order, empanadas fried golden, and cachapas folded around warm hand cheese. No shortcuts, and no heat lamps.",
  "about.body2": "The label came later. The pieces we wore behind the window, heavyweight and built for a Saturday rush, became a brand of their own. Worn at the truck, and shipped around the world.",
  "about.v1.title": "Hecho a Mano",
  "about.v1.body": "Made by hand, to order, every single plate.",
  "about.v2.title": "Family Recipes",
  "about.v2.body": "Straight from home, exactly as they should be.",
  "about.v3.title": "One Corner",
  "about.v3.body": "Food and label, sharing a single address in Freeport.",
  "about.team": "The Team",
  "about.team.title": "The faces behind the window.",
  "about.role.founder": "Founder",
  "about.role.chef": "Head Chef",
  "about.role.service": "Front of House",

  // media
  "media.eyebrow": "Media",
  "media.title.a": "Tagged",
  "media.title.b": "& served.",
  "media.lede": "Follow along for fresh plates, new drops, and the line out the window. Tag @riverosstreet and you might find yourself featured here.",
  "media.follow": "Follow the truck",

  // contact
  "contact.eyebrow": "Contact",
  "contact.title.a": "Say",
  "contact.title.b": "hello.",
  "contact.lede": "Questions, catering, or press? Reach us at the window or send a note and we will get right back to you.",
  "contact.addressLabel": "Address",
  "contact.hoursLabel": "Hours",
  "contact.phoneLabel": "Phone",
  "contact.followLabel": "Follow",
  "contact.formName": "Name",
  "contact.formEmail": "Email",
  "contact.formMessage": "Message",
  "contact.formSend": "Send Message",
  "contact.formSent": "Thank you. We will be in touch shortly.",
  "contact.formDemo": "We typically reply within one business day.",

  // categories
  "cat.All": "All",
  "cat.Outerwear": "Outerwear",
  "cat.Tops": "Tops",
  "cat.Bottoms": "Bottoms",
  "cat.Accessories": "Accessories",
};

const ES: Dict = {
  // nav
  "nav.home": "Inicio",
  "nav.restaurant": "El Camión",
  "nav.shop": "Tienda",
  "nav.media": "Galería",
  "nav.about": "Nosotros",
  "nav.story": "Historia",
  "nav.contact": "Contacto",
  "nav.menu": "Menú",
  "nav.reservations": "Ubicación",
  "nav.order": "Pedir",
  "nav.visit": "Ubicación",
  "nav.all": "Todo",
  "nav.new": "Nuevo",
  "nav.trending": "Tendencia",
  "nav.reserve": "Ubicación",
  "nav.bookTable": "Encuentra el Camión",

  // common
  "common.new": "Nuevo",
  "common.soldOut": "Agotado",

  // days
  "day.mon": "Lunes",
  "day.tue": "Martes",
  "day.wed": "Miércoles",
  "day.thu": "Jueves",
  "day.fri": "Viernes",
  "day.sat": "Sábado",
  "day.sun": "Domingo",

  // footer
  "footer.tagline": "Una dirección, dos apetitos. Un food truck venezolano y una marca de ropa compartiendo la misma esquina de Freeport, Florida.",
  "footer.visit": "Ubicación",
  "footer.follow": "Síguenos",
  "footer.address": "30 Lowery Rd, Unit B · Freeport, FL",
  "footer.hours": "Abierto todos los días, 11 AM a 10 PM (Vie y Sáb hasta 11 PM)",
  "footer.newsletter": "Boletín",
  "footer.rights": "Comer · Vestir · Vivir",

  // hub hero
  "hub.est": "DESDE 2026",
  "hub.oneAddress": "30 Lowery Rd, Freeport, FL",
  "hub.h1.a": "Comer.",
  "hub.h1.b": "Vestir.",
  "hub.h1.c": "Vivir.",
  "hub.lede": "Un food truck venezolano y una marca de ropa, juntos en una esquina de Freeport. Arepas recién hechas a la plancha y un guardarropa hecho para la calle.",
  "hub.twoHouses": "Dos Casas",
  "hub.twoHouses.title": "Una calle. Dos apetitos.",
  "hub.house1.tag": "El Camión",
  "hub.house1.title": "El Food Truck",
  "hub.house1.body": "Comida venezolana callejera. Arepas, empanadas y cachapas hechas a mano y servidas recién por la ventana, abierto todos los días desde las 11 AM.",
  "hub.house2.tag": "El Clóset",
  "hub.house2.title": "La Marca",
  "hub.house2.body": "Piezas hechas en cantidades limitadas. Algodón pesado, selvedge crudo y detalles rojos característicos. Usado en la ventana, enviado a todo el mundo.",
  "hub.findUs": "Ubicación",
  "hub.come": "Acércate.",
  "hub.stay": "Pide por la ventana.",
  "hub.detail.address": "Dirección",
  "hub.detail.hours": "Horario",
  "hub.detail.order": "Pedir",
  "hub.strip.cuisine": "Cocina",
  "hub.strip.where": "30 Lowery Rd · Freeport, FL",
  "hub.strip.hours": "Lun a Vie, 11 AM a 10 PM\nSáb y Dom, 11 AM a 11 PM",

  // eat home
  "eat.kitchen": "Comida Venezolana Callejera",
  "eat.openLate": "Abierto todos los días desde las 11 AM",
  "eat.h1.a": "Arepas,",
  "eat.h1.b": "Empanadas,",
  "eat.h1.c": "& más.",
  "eat.lede": "Auténtica comida venezolana, hecha al momento en 30 Lowery Road. Arepas abiertas y rellenas al instante, empanadas doradas, cachapas con queso de mano.",
  "eat.reserve": "Ubicación",
  "eat.menu": "Menú",
  "eat.order": "Pedir",
  "eat.houseRules": "Nuestra Promesa",
  "eat.houseRules.title": "Cómo cocinamos.",
  "eat.pillar1.title": "Hecho a Mano",
  "eat.pillar1.body": "Cada arepa se prensa y se asa al momento, nunca esperando bajo una lámpara.",
  "eat.pillar2.title": "Raíces Criollas",
  "eat.pillar2.body": "Recetas de familia desde Venezuela: pabellón, reina pepiada y los clásicos bien hechos.",
  "eat.pillar3.title": "Fresco y Rápido",
  "eat.pillar3.body": "Pide por la ventana y disfrútalo recién salido de la plancha.",
  "eat.visit": "Ubicación",
  "eat.visit.title1": "30 Lowery",
  "eat.visit.title2": "Road.",
  "eat.bookTable": "Encuentra el Camión",

  // menu page
  "menu.eyebrow": "Comida Venezolana",
  "menu.title.a": "Lo que estamos",
  "menu.title.b": "cocinando.",
  "menu.lede": "Hecho a mano, recién salido de la plancha. Esto es lo que servimos hoy.",
  "menu.plates": "platos",
  "menu.reserve": "Encuentra el Camión",
  "menu.section.appetizers": "Entradas",
  "menu.section.arepas": "Arepas",
  "menu.section.buildYourOwn": "Arma Tu Plato",
  "menu.section.pepitos": "Pepitos",
  "menu.section.burgers": "Hamburguesas",
  "menu.section.cachapas": "Cachapas",
  "menu.section.patacones": "Patacones",
  "menu.section.sides": "Acompañantes",
  "menu.section.kids": "Menú Infantil",
  "menu.section.loadedFries": "Papas Cargadas",
  "menu.section.beverages": "Bebidas",

  // find us
  "find.eyebrow": "Ubicación",
  "find.title.a": "Encuentra el",
  "find.title.b": "Camión.",
  "find.lede": "Nos encuentras en 30 Lowery Road en Freeport. Acércate, pide por la ventana y disfruta.",
  "find.addressLabel": "Dirección",
  "find.hoursLabel": "Horario",
  "find.phoneLabel": "Teléfono",
  "find.directions": "Cómo Llegar",
  "find.orderCta": "Pedir Para Llevar",
  "find.call": "Llamar al Camión",

  // order
  "order.eyebrow": "Pedir Para Llevar",
  "order.title.a": "Recoger en la",
  "order.title.b": "ventana.",
  "order.lede": "Explora el menú y arma tu pedido. El pago en línea llega pronto; por ahora, pide recién en la ventana.",
  "order.add": "Agregar al Pedido (Próximamente)",
  "order.back": "Volver al Menú",

  // reviews
  "reviews.eyebrow": "Lo Que Dicen",
  "reviews.title": "Directo de nuestros clientes.",
  "reviews.cta": "Ver todas las reseñas en Google",
  "reviews.count": "reseñas en Google",

  // shop home
  "shop.ss26": "SS26",
  "shop.volume": "Volumen Uno · Drop 01",
  "shop.h1.a": "Usado en",
  "shop.h1.b": "la ventana.",
  "shop.h1.c": "Vendido al mundo.",
  "shop.lede": "Doce piezas en algodón pesado y selvedge crudo, con detalles rojos característicos. Hechas en cantidades limitadas; cuando se acaban, se acaban.",
  "shop.shopDrop": "Comprar el Drop",
  "shop.featured": "Destacado",
  "shop.newIn": "Recién Llegado",
  "shop.viewAll": "Ver Todo",
  "shop.label": "La Marca",
  "shop.label.title1": "Nacido en el camión.",
  "shop.label.title2": "Hecho para la calle.",
  "shop.label.body": "Cada pieza se usa detrás de la ventana antes de llegar al perchero. Si no aguanta un sábado de lleno, no pasa el corte.",

  // products
  "products.eyebrow": "La Colección",
  "products.titleNew": "Recién Llegado.",
  "products.titleTrending": "Tendencia.",
  "products.titleAll": "Todas las Piezas.",
  "products.empty": "Nada por aquí todavía. Vuelve pronto, por favor.",
  "products.back": "Todos los Productos",
  "products.size": "Talla",
  "products.oneSize": "Talla Única",
  "products.add": "Agregar a la Bolsa (Próximamente)",
  "products.ship": "Envío gratis en pedidos de más de $200",
  "products.returns": "Devoluciones fáciles dentro de 30 días",
  "products.small": "Hecho en cantidades limitadas",

  // about
  "about.eyebrow": "Nosotros",
  "about.title.a": "De Caracas",
  "about.title.b": "a Freeport.",
  "about.lede": "Rivero's Street comenzó con una sola ventana, una plancha y un recetario de familia. Hoy es un food truck venezolano y una marca de ropa compartiendo la misma esquina.",
  "about.body1": "Todo lo que servimos es comida criolla, la comida callejera con la que crecimos. Arepas prensadas y asadas al momento, empanadas doradas y cachapas con queso de mano. Sin atajos y sin lámparas de calor.",
  "about.body2": "La marca vino después. Las piezas que usábamos detrás de la ventana, pesadas y hechas para aguantar un sábado de lleno, se volvieron una marca propia. Usadas en el camión y enviadas por todo el mundo.",
  "about.v1.title": "Hecho a Mano",
  "about.v1.body": "Hecho a mano, al momento, cada plato.",
  "about.v2.title": "Recetas de Familia",
  "about.v2.body": "Directo de casa, tal como debe ser.",
  "about.v3.title": "Una Esquina",
  "about.v3.body": "Comida y marca, compartiendo una sola dirección en Freeport.",
  "about.team": "El Equipo",
  "about.team.title": "Las caras detrás de la ventana.",
  "about.role.founder": "Fundador",
  "about.role.chef": "Chef Principal",
  "about.role.service": "Atención al Cliente",

  // media
  "media.eyebrow": "Galería",
  "media.title.a": "Etiquetado",
  "media.title.b": "y servido.",
  "media.lede": "Síguenos para ver platos recién hechos, nuevos drops y la fila en la ventana. Etiqueta @riverosstreet y podrías aparecer aquí.",
  "media.follow": "Sigue al camión",

  // contact
  "contact.eyebrow": "Contacto",
  "contact.title.a": "Saluda",
  "contact.title.b": "pues.",
  "contact.lede": "¿Preguntas, catering o prensa? Búscanos en la ventana o envíanos un mensaje y te responderemos enseguida.",
  "contact.addressLabel": "Dirección",
  "contact.hoursLabel": "Horario",
  "contact.phoneLabel": "Teléfono",
  "contact.followLabel": "Síguenos",
  "contact.formName": "Nombre",
  "contact.formEmail": "Correo",
  "contact.formMessage": "Mensaje",
  "contact.formSend": "Enviar Mensaje",
  "contact.formSent": "Gracias. Te contactaremos muy pronto.",
  "contact.formDemo": "Normalmente respondemos en un día hábil.",

  // categories
  "cat.All": "Todo",
  "cat.Outerwear": "Abrigos",
  "cat.Tops": "Partes de Arriba",
  "cat.Bottoms": "Pantalones",
  "cat.Accessories": "Accesorios",
};

const DICTS: Record<Lang, Dict> = { en: EN, es: ES };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "rs-lang";

/**
 * The registrable base domain, so a cookie set here is shared across
 * subdomains (eat./shop./apex). localhost is special-cased for dev.
 */
function baseDomain(host: string): string {
  if (host === "localhost" || host.endsWith(".localhost")) return "localhost";
  const parts = host.split(".");
  return parts.length <= 2 ? host : parts.slice(-2).join(".");
}

function readLangCookie(): Lang | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`));
  const v = m ? decodeURIComponent(m[1]) : null;
  return v === "en" || v === "es" ? v : null;
}

function writeLangCookie(l: Lang) {
  if (typeof document === "undefined") return;
  const domain = baseDomain(location.hostname);
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${STORAGE_KEY}=${l}; path=/; domain=${domain}; max-age=31536000; SameSite=Lax${secure}`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // 1) An explicit ?lang= in the URL wins (carries choice across subdomains,
    //    since localhost subdomains can't share a cookie). Persist + clean it.
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("lang");
    let next: Lang | null = fromUrl === "en" || fromUrl === "es" ? fromUrl : null;

    if (next) {
      writeLangCookie(next);
      localStorage.setItem(STORAGE_KEY, next);
      params.delete("lang");
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash
      );
    } else {
      next = readLangCookie() ?? (localStorage.getItem(STORAGE_KEY) as Lang | null);
    }

    if (next === "en" || next === "es") {
      setLangState(next);
      document.documentElement.lang = next;
    } else if (navigator.language?.toLowerCase().startsWith("es")) {
      setLangState("es");
      document.documentElement.lang = "es";
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      writeLangCookie(l);
      localStorage.setItem(STORAGE_KEY, l); // same-origin cache / fallback
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback(
    (key: string) => DICTS[lang][key] ?? DICTS.en[key] ?? key,
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
