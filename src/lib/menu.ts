export type Localized = { en: string; es: string };

/** A single selectable option within a group, with an optional price delta. */
export type ModifierChoice = {
  label: Localized;
  /** added to the item price when selected (default 0) */
  price?: number;
};

/**
 * A group of choices on an item.
 * - "single": radio (exactly one; first is the default unless `optional`)
 * - "multi":  checkboxes (zero or more, capped by `max`)
 */
export type ModifierGroup = {
  key: string;
  label: Localized;
  type: "single" | "multi";
  /** single groups are required by default; set optional to allow "none" */
  optional?: boolean;
  /** multi groups only: max number of selections */
  max?: number;
  choices: ModifierChoice[];
};

export type MenuItem = {
  name: string;
  description: Localized;
  price: number;
  /** optional extra pricing context, e.g. sizes or upcharges */
  priceNote?: Localized;
  /**
   * Photo for the item. Drop a file in `public/menu/` and set the path here,
   * e.g. image: "/menu/pelua.jpg". Until set, a branded placeholder tile shows.
   */
  image?: string;
  /** customization groups shown in the order flow */
  options?: ModifierGroup[];
};

/** Stable slug used as a cart/item id and for anchors. */
export const itemId = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

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

// ── Reusable modifier groups ──────────────────────────────────────────────
const SAUCE_CHOICES: ModifierChoice[] = [
  { label: { en: "Street Sauce", es: "Salsa de la casa" } },
  { label: { en: "Garlic", es: "Ajo" } },
  { label: { en: "Cilantro", es: "Cilantro" } },
  { label: { en: "Nata Llanera", es: "Nata llanera" } },
  { label: { en: "Spicy Street", es: "Picante" } },
];
const sauceGroup = (): ModifierGroup => ({
  key: "sauce", label: { en: "Sauce", es: "Salsa" }, type: "single", choices: SAUCE_CHOICES,
});
const arepaStyle = (): ModifierGroup => ({
  key: "style", label: { en: "Style", es: "Estilo" }, type: "single",
  choices: [
    { label: { en: "Grilled", es: "A la parrilla" } },
    { label: { en: "Fried", es: "Frita" } },
  ],
});
const addCheeseBacon = (): ModifierGroup => ({
  key: "addons", label: { en: "Add extras", es: "Agregar" }, type: "multi",
  choices: [
    { label: { en: "Cheese", es: "Queso" }, price: 1.5 },
    { label: { en: "Bacon", es: "Tocineta" }, price: 1.5 },
  ],
});
const beefOrChicken = (): ModifierGroup => ({
  key: "protein", label: { en: "Protein", es: "Proteína" }, type: "single",
  choices: [
    { label: { en: "Angus Beef", es: "Carne angus" } },
    { label: { en: "Chicken", es: "Pollo" } },
  ],
});

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
        options: [
          {
            key: "size", label: { en: "Size", es: "Tamaño" }, type: "single",
            choices: [
              { label: { en: "3 units", es: "3 unidades" } },
              { label: { en: "5 units", es: "5 unidades" }, price: 4 },
            ],
          },
        ],
      },
      {
        name: "Empanadas",
        price: 5,
        description: {
          en: "Venezuelan fried corn turnovers — chicken, beef or cheese",
          es: "Empanadas de maíz fritas — pollo, carne o queso",
        },
        options: [
          {
            key: "filling", label: { en: "Filling", es: "Relleno" }, type: "single",
            choices: [
              { label: { en: "Chicken", es: "Pollo" } },
              { label: { en: "Beef", es: "Carne" } },
              { label: { en: "Cheese", es: "Queso" } },
            ],
          },
        ],
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
        options: [arepaStyle(), sauceGroup()],
      },
      {
        name: "Catira",
        price: 9,
        description: {
          en: "Shredded chicken & mozzarella cheese",
          es: "Pollo mechado y queso mozzarella",
        },
        options: [arepaStyle(), sauceGroup()],
      },
      {
        name: "Carne Asada",
        price: 11,
        description: {
          en: "Steak, pico de gallo, queso llanero & cilantro sauce",
          es: "Bistec, pico de gallo, queso llanero y salsa de cilantro",
        },
        options: [arepaStyle(), sauceGroup()],
      },
      {
        name: "Pabellón",
        price: 13,
        description: {
          en: "Shredded beef, black beans, sweet plantain, queso llanero & butter",
          es: "Carne mechada, caraotas negras, tajada, queso llanero y mantequilla",
        },
        options: [arepaStyle(), sauceGroup()],
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
        options: [
          {
            key: "base", label: { en: "Base", es: "Base" }, type: "single",
            choices: [
              { label: { en: "White Rice", es: "Arroz blanco" } },
              { label: { en: "Yellow Rice", es: "Arroz amarillo" } },
              { label: { en: "Black Beans", es: "Caraotas negras" } },
            ],
          },
          {
            key: "protein", label: { en: "Protein", es: "Proteína" }, type: "single",
            choices: [
              { label: { en: "Grilled Chicken", es: "Pollo a la parrilla" } },
              { label: { en: "Steak", es: "Bistec" }, price: 2 },
              { label: { en: "Beef Barbacoa", es: "Carne barbacoa" }, price: 2 },
              { label: { en: "Chorizo", es: "Chorizo" }, price: 2 },
              { label: { en: "Ribeye", es: "Ribeye" }, price: 4 },
            ],
          },
          {
            key: "toppings", label: { en: "Toppings", es: "Toppings" }, type: "multi", max: 4,
            choices: [
              { label: { en: "Lettuce", es: "Lechuga" } },
              { label: { en: "Pico de Gallo", es: "Pico de gallo" } },
              { label: { en: "Corn", es: "Maíz" } },
              { label: { en: "Mozzarella", es: "Mozzarella" } },
              { label: { en: "Queso Llanero", es: "Queso llanero" } },
              { label: { en: "Shredded Cheddar", es: "Cheddar rallado" } },
              { label: { en: "Sweet Plantains", es: "Tajadas" } },
            ],
          },
          sauceGroup(),
        ],
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
        options: [
          {
            key: "size", label: { en: "Size", es: "Tamaño" }, type: "single",
            choices: [
              { label: { en: '6"', es: '6"' } },
              { label: { en: '12"', es: '12"' }, price: 2 },
            ],
          },
          {
            key: "protein", label: { en: "Protein", es: "Proteína" }, type: "single",
            choices: [
              { label: { en: "Chicken", es: "Pollo" } },
              { label: { en: "All Beef", es: "Toda carne" }, price: 1 },
            ],
          },
          addCheeseBacon(),
        ],
      },
      {
        name: "Guaro",
        price: 18,
        description: {
          en: "Chicken or beef (+$1 all beef), bacon, corn, parmesan cheese & sauces",
          es: "Pollo o carne (+$1 toda carne), tocineta, maíz, queso parmesano y salsas",
        },
        options: [
          {
            key: "protein", label: { en: "Protein", es: "Proteína" }, type: "single",
            choices: [
              { label: { en: "Chicken", es: "Pollo" } },
              { label: { en: "All Beef", es: "Toda carne" }, price: 1 },
            ],
          },
          addCheeseBacon(),
        ],
      },
      {
        name: "Caraqueño",
        price: 22,
        priceNote: { en: "Wrap", es: "Wrap" },
        description: {
          en: "Angus beef, chicken, chorizo, bacon, lettuce, tomato, corn, onions, potato sticks, shredded cheddar & sauces",
          es: "Carne angus, pollo, chorizo, tocineta, lechuga, tomate, maíz, cebolla, papitas, cheddar rallado y salsas",
        },
        options: [addCheeseBacon()],
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
        options: [beefOrChicken(), addCheeseBacon()],
      },
      {
        name: "Americana Deluxe",
        price: 15,
        description: {
          en: "Double smashed beef, bacon, grilled onions, American cheese & street sauce",
          es: "Doble carne smash, tocineta, cebolla a la plancha, queso americano y salsa de la casa",
        },
        options: [addCheeseBacon()],
      },
      {
        name: "Zuliana",
        price: 17,
        description: {
          en: "Angus beef or chicken, potato sticks, bacon, ham, sweet plantain, queso de mano, lettuce, tomato & street sauce",
          es: "Carne angus o pollo, papitas, tocineta, jamón, tajada, queso de mano, lechuga, tomate y salsa de la casa",
        },
        options: [beefOrChicken(), addCheeseBacon()],
      },
      {
        name: "Triple Venezolana",
        price: 20,
        description: {
          en: "Angus beef, chicken, chorizo, bacon, ham, fried egg, potato sticks, shredded cheese, lettuce, tomato & street sauce",
          es: "Carne angus, pollo, chorizo, tocineta, jamón, huevo frito, papitas, queso rallado, lechuga, tomate y salsa de la casa",
        },
        options: [addCheeseBacon()],
      },
      {
        name: "Street Smash",
        price: 16,
        description: {
          en: "Double smashed beef, crispy bacon, fried egg, mozzarella, potato sticks, sweet onions & street sauce",
          es: "Doble carne smash, tocineta crujiente, huevo frito, mozzarella, papitas, cebolla dulce y salsa de la casa",
        },
        options: [addCheeseBacon()],
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
        options: [
          {
            key: "plantain", label: { en: "Plantain", es: "Plátano" }, type: "single",
            choices: [
              { label: { en: "Green", es: "Verde" } },
              { label: { en: "Sweet", es: "Maduro" } },
            ],
          },
          {
            key: "protein", label: { en: "Protein", es: "Proteína" }, type: "single",
            choices: [
              { label: { en: "Chicken", es: "Pollo" } },
              { label: { en: "Shredded Beef", es: "Carne mechada" }, price: 1 },
            ],
          },
        ],
      },
      {
        name: "Patacón Gratinado",
        price: 18,
        description: {
          en: "Green or sweet plantain, chicken or grilled steak (+$2), ham, queso de mano, lettuce, tomato, sauces & melted cheese",
          es: "Plátano verde o maduro, pollo o bistec a la parrilla (+$2), jamón, queso de mano, lechuga, tomate, salsas y queso gratinado",
        },
        options: [
          {
            key: "plantain", label: { en: "Plantain", es: "Plátano" }, type: "single",
            choices: [
              { label: { en: "Green", es: "Verde" } },
              { label: { en: "Sweet", es: "Maduro" } },
            ],
          },
          {
            key: "protein", label: { en: "Protein", es: "Proteína" }, type: "single",
            choices: [
              { label: { en: "Chicken", es: "Pollo" } },
              { label: { en: "Grilled Steak", es: "Bistec a la parrilla" }, price: 2 },
            ],
          },
        ],
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
        options: [
          {
            key: "protein", label: { en: "Protein", es: "Proteína" }, type: "single",
            choices: [
              { label: { en: "Grilled Chicken", es: "Pollo a la parrilla" } },
              { label: { en: "Steak", es: "Bistec" }, price: 1 },
            ],
          },
          {
            key: "beans", label: { en: "Black beans", es: "Caraotas" }, type: "multi",
            choices: [{ label: { en: "Add black beans", es: "Agregar caraotas" } }],
          },
        ],
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
        options: [
          {
            key: "size", label: { en: "Size", es: "Tamaño" }, type: "single",
            choices: [
              { label: { en: "Small", es: "Pequeño" } },
              { label: { en: "Large", es: "Grande" }, price: 2 },
            ],
          },
          {
            key: "flavor", label: { en: "Flavor", es: "Sabor" }, type: "single",
            choices: [
              { label: { en: "Peach", es: "Durazno" } },
              { label: { en: "Lemon", es: "Limón" } },
              { label: { en: "Passion Fruit", es: "Maracuyá" } },
            ],
          },
        ],
      },
      {
        name: "Imported Venezuelan Sodas",
        price: 4.5,
        description: {
          en: "Frescolita, Postobón or Malta Polar",
          es: "Frescolita, Postobón o Malta Polar",
        },
        options: [
          {
            key: "flavor", label: { en: "Flavor", es: "Sabor" }, type: "single",
            choices: [
              { label: { en: "Frescolita", es: "Frescolita" } },
              { label: { en: "Postobón", es: "Postobón" } },
              { label: { en: "Malta Polar", es: "Malta Polar" } },
            ],
          },
        ],
      },
      {
        name: "American Sodas",
        price: 3,
        description: {
          en: "Coca-Cola, Diet Coke, Coke Zero, Sprite, Fanta Orange or Fanta Grape",
          es: "Coca-Cola, Diet Coke, Coke Zero, Sprite, Fanta Naranja o Fanta Uva",
        },
        options: [
          {
            key: "flavor", label: { en: "Flavor", es: "Sabor" }, type: "single",
            choices: [
              { label: { en: "Coca-Cola", es: "Coca-Cola" } },
              { label: { en: "Diet Coke", es: "Diet Coke" } },
              { label: { en: "Coke Zero", es: "Coke Zero" } },
              { label: { en: "Sprite", es: "Sprite" } },
              { label: { en: "Fanta Orange", es: "Fanta Naranja" } },
              { label: { en: "Fanta Grape", es: "Fanta Uva" } },
            ],
          },
        ],
      },
    ],
  },
];
