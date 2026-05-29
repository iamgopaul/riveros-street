Menu item photos
================

Drop item photos in this folder and point the menu item at them.

1) Add a file here, e.g.  public/menu/pelua.jpg  (square-ish, ~800x800, .jpg/.webp)
2) In src/lib/menu.ts, set the item's `image` field:

     {
       name: "Pelúa",
       price: 11,
       image: "/menu/pelua.jpg",   // <-- add this line
       ...
     }

Until `image` is set, the item shows the branded gradient placeholder tile
(with a small camera hint). No broken images appear.

Suggested filenames (one per item), all lowercase:
  tequenos, empanadas, pelua, catira, carne-asada, pabellon, arma-tu-plato,
  pepito-original, guaro, caraqueno, venezolana, americana-deluxe, zuliana,
  triple-venezolana, street-smash, cachapa-con-queso-de-mano,
  double-cheese-cachapa, cachapa-catira, cachapa-cochinita, cachapa-pelua,
  cachapa-ribeye, patacon, patacon-gratinado, french-fries, sweet-plantains,
  pork-belly, cheeseburger, kids-bowl, papas-locas, nestea,
  imported-venezuelan-sodas, american-sodas
