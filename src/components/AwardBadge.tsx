import Image from "next/image";
import badge from "../../public/guru-award.png";

/**
 * Restaurant Guru 2025 "Best Restaurant" award badge.
 * The background was made transparent so the circle reads cleanly on any
 * surface — size it with `className` (e.g. "w-32") and let the height follow.
 */
export function AwardBadge({ className = "w-32" }: { className?: string }) {
  return (
    <Image
      src={badge}
      alt="Restaurant Guru 2025 — Best Restaurant — Rivero's Street"
      width={badge.width}
      height={badge.height}
      className={`h-auto select-none ${className}`}
    />
  );
}
