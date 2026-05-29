export type Localized = { en: string; es: string };

export type MenuItem = {
  name: string;
  description: Localized;
  price: number;
  /** optional extra pricing context, e.g. sizes or upcharges */
  priceNote?: Localized;
};

export type MenuSection = {
  /** translation key suffix used with t(`menu.section.${key}`) */
  key:
    | "appetizers"
    | "arepas"
    | "buildYourOwn"
    | "pepitos"
    | "burgers"
    | "cachapas"
    | "patacones"
    | "sides"
    | "kids"
    | "loadedFries"
    | "beverages";
  items: MenuItem[];
};

export const MENU: MenuSection[] = [
  {
    key: "appetizers",
    items: [
      {
        name: "Tequeños",
        price: 9,
        priceNote: { en: "3 units · 5 for $13", es: "3 unidades · 5 por $13" },
        description: {
          en: "Venezuelan cheese sticks — crispy fried dough filled with melted white cheese",
          es: "Palitos de queso venezolanos — masa frita crujiente rellena de queso blanco derretido",
        },
      },
      {
        name: "Empanadas",
        price: 5,
        description: {
          en: "Venezuelan fried corn turnovers — chicken, beef or cheese",
          es: "Empanadas de maíz fritas — pollo, carne o queso",
        },
      },
    ],
  },
  {
    key: "arepas",
    items: [
      {
        name: "Pelúa",
        price: 11,
        description: {
          en: "Shredded beef, cheddar cheese & butter",
          es: "Carne mechada, queso cheddar y mantequilla",
        },
      },
      {
        name: "Catira",
        price: 9,
        description: {
          en: "Shredded chicken & mozzarella cheese",
          es: "Pollo mechado y queso mozzarella",
        },
      },
      {
        name: "Carne Asada",
        price: 11,
        description: {
          en: "Steak, pico de gallo, queso llanero & cilantro sauce",
          es: "Bistec, pico de gallo, queso llanero y salsa de cilantro",
        },
      },
      {
        name: "Pabellón",
        price: 13,
        description: {
          en: "Shredded beef, black beans, sweet plantain, queso llanero & butter",
          es: "Carne mechada, caraotas negras, tajada, queso llanero y mantequilla",
        },
      },
    ],
  },
  {
    key: "buildYourOwn",
    items: [
      {
        name: "Arma Tu Plato",
        price: 11,
        priceNote: { en: "Street lunch special", es: "Especial de almuerzo" },
        description: {
          en: "Build your own bowl — choose a base (white rice, yellow rice or black beans), a protein (grilled chicken, steak, beef barbacoa, chorizo or ribeye), up to 4 toppings & a sauce",
          es: "Arma tu propio bowl — elige una base (arroz blanco, arroz amarillo o caraotas), una proteína (pollo a la parrilla, bistec, carne barbacoa, chorizo o ribeye), hasta 4 toppings y una salsa",
        },
      },
    ],
  },
  {
    key: "pepitos",
    items: [
      {
        name: "Pepito Original",
        price: 16,
        priceNote: { en: '6" · 12" for $18', es: '6" · 12" por $18' },
        description: {
          en: "Chicken or beef (+$1 all beef), bacon, shredded cheddar, lettuce, tomato, potato sticks & sauces",
          es: "Pollo o carne (+$1 toda carne), tocineta, cheddar rallado, lechuga, tomate, papitas y salsas",
        },
      },
      {
        name: "Guaro",
        price: 18,
        description: {
          en: "Chicken or beef (+$1 all beef), bacon, corn, parmesan cheese & sauces",
          es: "Pollo o carne (+$1 toda carne), tocineta, maíz, queso parmesano y salsas",
        },
      },
      {
        name: "Caraqueño",
        price: 22,
        priceNote: { en: "Wrap", es: "Wrap" },
        description: {
          en: "Angus beef, chicken, chorizo, bacon, lettuce, tomato, corn, onions, potato sticks, shredded cheddar & sauces",
          es: "Carne angus, pollo, chorizo, tocineta, lechuga, tomate, maíz, cebolla, papitas, cheddar rallado y salsas",
        },
      },
    ],
  },
  {
    key: "burgers",
    items: [
      {
        name: "Venezolana",
        price: 16,
        description: {
          en: "Angus beef or chicken, bacon, ham, fried egg, shredded cheese, potato sticks, lettuce, tomato & street sauce",
          es: "Carne angus o pollo, tocineta, jamón, huevo frito, queso rallado, papitas, lechuga, tomate y salsa de la casa",
        },
      },
      {
        name: "Americana Deluxe",
        price: 15,
        description: {
          en: "Double smashed beef, bacon, grilled onions, American cheese & street sauce",
          es: "Doble carne smash, tocineta, cebolla a la plancha, queso americano y salsa de la casa",
        },
      },
      {
        name: "Zuliana",
        price: 17,
        description: {
          en: "Angus beef or chicken, potato sticks, bacon, ham, sweet plantain, queso de mano, lettuce, tomato & street sauce",
          es: "Carne angus o pollo, papitas, tocineta, jamón, tajada, queso de mano, lechuga, tomate y salsa de la casa",
        },
      },
      {
        name: "Triple Venezolana",
        price: 20,
        description: {
          en: "Angus beef, chicken, chorizo, bacon, ham, fried egg, potato sticks, shredded cheese, lettuce, tomato & street sauce",
          es: "Carne angus, pollo, chorizo, tocineta, jamón, huevo frito, papitas, queso rallado, lechuga, tomate y salsa de la casa",
        },
      },
      {
        name: "Street Smash",
        price: 16,
        description: {
          en: "Double smashed beef, crispy bacon, fried egg, mozzarella, potato sticks, sweet onions & street sauce",
          es: "Doble carne smash, tocineta crujiente, huevo frito, mozzarella, papitas, cebolla dulce y salsa de la casa",
        },
      },
    ],
  },
  {
    key: "cachapas",
    items: [
      {
        name: "Cachapa con Queso de Mano",
        price: 15,
        description: {
          en: "Sweet corn pancake with queso de mano",
          es: "Cachapa de maíz con queso de mano",
        },
      },
      {
        name: "Double Cheese Cachapa",
        price: 18,
        description: {
          en: "Sweet corn pancake with double cheese",
          es: "Cachapa de maíz con doble queso",
        },
      },
      {
        name: "Cachapa Catira",
        price: 17,
        description: { en: "With shredded chicken", es: "Con pollo mechado" },
      },
      {
        name: "Cachapa Cochinita",
        price: 19,
        description: { en: "With crispy pork belly", es: "Con pernil crujiente" },
      },
      {
        name: "Cachapa Pelúa",
        price: 20,
        description: { en: "With shredded beef", es: "Con carne mechada" },
      },
      {
        name: "Cachapa Ribeye",
        price: 22,
        description: { en: "With grilled ribeye", es: "Con ribeye a la parrilla" },
      },
    ],
  },
  {
    key: "patacones",
    items: [
      {
        name: "Patacón",
        price: 16,
        description: {
          en: "Green or sweet plantain, shredded beef (+$1) or chicken, lettuce, tomato, ham, queso llanero & sauces",
          es: "Plátano verde o maduro, carne mechada (+$1) o pollo, lechuga, tomate, jamón, queso llanero y salsas",
        },
      },
      {
        name: "Patacón Gratinado",
        price: 18,
        description: {
          en: "Green or sweet plantain, chicken or grilled steak (+$2), ham, queso de mano, lettuce, tomato, sauces & melted cheese",
          es: "Plátano verde o maduro, pollo o bistec a la parrilla (+$2), jamón, queso de mano, lechuga, tomate, salsas y queso gratinado",
        },
      },
    ],
  },
  {
    key: "sides",
    items: [
      {
        name: "French Fries",
        price: 4,
        description: { en: "Crispy fries", es: "Papas fritas crujientes" },
      },
      {
        name: "Sweet Plantains",
        price: 5,
        description: { en: "With queso llanero", es: "Con queso llanero" },
      },
      {
        name: "Pork Belly",
        price: 6,
        description: { en: "Chicharrón", es: "Chicharrón" },
      },
    ],
  },
  {
    key: "kids",
    items: [
      {
        name: "Cheeseburger",
        price: 9,
        description: {
          en: "Angus beef, American cheese & ketchup — fries & drink included",
          es: "Carne angus, queso americano y kétchup — papas y bebida incluidas",
        },
      },
      {
        name: "Kids Bowl",
        price: 8,
        description: {
          en: "White rice, black beans (optional), grilled chicken or steak (+$1), mozzarella — served with a drink",
          es: "Arroz blanco, caraotas (opcional), pollo o bistec (+$1), mozzarella — con bebida",
        },
      },
    ],
  },
  {
    key: "loadedFries",
    items: [
      {
        name: "Papas Locas",
        price: 18,
        description: {
          en: "Loaded fries with beef, chicken, chorizo, bacon, corn, onion, shredded cheddar & sauces",
          es: "Papas cargadas con carne, pollo, chorizo, tocineta, maíz, cebolla, cheddar rallado y salsas",
        },
      },
    ],
  },
  {
    key: "beverages",
    items: [
      {
        name: "Nestea",
        price: 5,
        priceNote: { en: "Small · Large $7", es: "Pequeño · Grande $7" },
        description: {
          en: "Peach, lemon or passion fruit",
          es: "Durazno, limón o maracuyá",
        },
      },
      {
        name: "Imported Venezuelan Sodas",
        price: 4.5,
        description: {
          en: "Frescolita, Postobón or Malta Polar",
          es: "Frescolita, Postobón o Malta Polar",
        },
      },
      {
        name: "American Sodas",
        price: 3,
        description: {
          en: "Coca-Cola, Diet Coke, Coke Zero, Sprite, Fanta Orange or Fanta Grape",
          es: "Coca-Cola, Diet Coke, Coke Zero, Sprite, Fanta Naranja o Fanta Uva",
        },
      },
    ],
  },
];
