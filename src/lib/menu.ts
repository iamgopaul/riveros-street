export type Localized = { en: string; es: string };

export type MenuItem = {
  name: string;
  description: Localized;
  price: number;
};

export type MenuSection = {
  /** translation key suffix used with t(`menu.section.${key}`) */
  key: "arepas" | "empanadas" | "platos" | "dulces";
  items: MenuItem[];
};

export const MENU: MenuSection[] = [
  {
    key: "arepas",
    items: [
      { name: "Reina Pepiada", price: 10, description: { en: "Shredded chicken, avocado, mayo", es: "Pollo mechado, aguacate, mayonesa" } },
      { name: "Pabellón", price: 12, description: { en: "Shredded beef, black beans, sweet plantain, cheese", es: "Carne mechada, caraotas, tajada, queso" } },
      { name: "Pelúa", price: 11, description: { en: "Shredded beef, yellow cheese", es: "Carne mechada, queso amarillo" } },
      { name: "Dominó", price: 9, description: { en: "Black beans, white cheese", es: "Caraotas negras, queso blanco" } },
      { name: "Catira", price: 10, description: { en: "Shredded chicken, yellow cheese", es: "Pollo mechado, queso amarillo" } },
    ],
  },
  {
    key: "empanadas",
    items: [
      { name: "Empanada de Carne", price: 5, description: { en: "Fried corn turnover, shredded beef", es: "Empanada de maíz frita, carne mechada" } },
      { name: "Empanada de Pollo", price: 5, description: { en: "Fried corn turnover, shredded chicken", es: "Empanada de maíz frita, pollo mechado" } },
      { name: "Empanada de Queso", price: 4, description: { en: "Fried corn turnover, white cheese", es: "Empanada de maíz frita, queso blanco" } },
      { name: "Tequeños (6)", price: 9, description: { en: "Fried dough wrapped around cheese", es: "Palitos de masa rellenos de queso" } },
      { name: "Tajadas", price: 5, description: { en: "Fried sweet plantain", es: "Plátano maduro frito" } },
    ],
  },
  {
    key: "platos",
    items: [
      { name: "Pabellón Criollo", price: 16, description: { en: "Shredded beef, rice, black beans, sweet plantain", es: "Carne mechada, arroz, caraotas, tajada" } },
      { name: "Cachapa con Queso", price: 12, description: { en: "Sweet corn pancake, hand cheese, butter", es: "Cachapa de maíz, queso de mano, mantequilla" } },
      { name: "Patacón", price: 14, description: { en: "Fried green plantain 'sandwich', beef or chicken", es: "Sándwich de plátano verde frito, carne o pollo" } },
      { name: "Perro Caliente", price: 9, description: { en: "Venezuelan hot dog, the works", es: "Perro caliente venezolano, con todo" } },
    ],
  },
  {
    key: "dulces",
    items: [
      { name: "Quesillo", price: 6, description: { en: "Venezuelan caramel flan", es: "Flan venezolano de caramelo" } },
      { name: "Tres Leches", price: 6, description: { en: "Three-milk sponge cake", es: "Bizcocho de tres leches" } },
      { name: "Chicha", price: 5, description: { en: "Sweet rice & milk drink", es: "Bebida dulce de arroz y leche" } },
      { name: "Papelón con Limón", price: 4, description: { en: "Cane-sugar lemonade", es: "Limonada con papelón" } },
      { name: "Malta", price: 3, description: { en: "Malt soda", es: "Refresco de malta" } },
    ],
  },
];
