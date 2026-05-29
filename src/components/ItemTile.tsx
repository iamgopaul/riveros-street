import Image from "next/image";
import type { MenuSection } from "@/lib/menu";

/**
 * Menu thumbnail. Shows the item photo when `image` is set; otherwise an
 * on-brand gradient placeholder with the item's initials. Drop photos in
 * `public/menu/` and set `image` on the menu item to replace the placeholder.
 */
const GRADIENTS: Record<MenuSection["key"], string> = {
  appetizers: "from-[#7a0d14] to-[#2a0508]",
  arepas: "from-[#b3101b] to-[#3a0509]",
  buildYourOwn: "from-[#e11d2a] to-[#5a0b11]",
  pepitos: "from-[#8f1119] to-[#250407]",
  burgers: "from-[#c2151f] to-[#400709]",
  cachapas: "from-[#a8101a] to-[#2e0508]",
  patacones: "from-[#7a0d14] to-[#1c0305]",
  sides: "from-[#5a0b11] to-[#1c0305]",
  kids: "from-[#d11824] to-[#4a080d]",
  loadedFries: "from-[#b3101b] to-[#2a0508]",
  beverages: "from-[#6a0c12] to-[#160304]",
};

function initials(name: string) {
  const words = name.replace(/[^a-zA-Z0-9 ]/g, "").trim().split(/\s+/);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? words[0]?.[1] ?? "")).toUpperCase();
}

export function ItemTile({
  name,
  sectionKey,
  image,
  className = "",
}: {
  name: string;
  sectionKey: MenuSection["key"];
  image?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-muted ${className}`}>
        <Image src={image} alt={name} fill sizes="(max-width:640px) 40vw, 240px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden bg-gradient-to-br ${GRADIENTS[sectionKey]} ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-white/10 leading-none select-none text-[clamp(2.5rem,7vw,6rem)]">
        {initials(name)}
      </span>
      <span className="absolute inset-0 mix-blend-overlay opacity-30 hazard-thin" />
      {/* photo-slot hint */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 text-white/30">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <circle cx="12" cy="13" r="3.2" />
        <path d="M8 6l1.2-2h5.6L16 6" />
      </svg>
    </div>
  );
}
