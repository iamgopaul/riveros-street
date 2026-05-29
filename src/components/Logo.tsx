import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.webp";

export function Logo({ href = "/", size = "md" }: { href?: string; size?: "sm" | "md" | "lg" }) {
  const heights = { sm: 28, md: 36, lg: 56 } as const;
  const h = heights[size];
  return (
    <Link href={href} className="inline-flex items-center" aria-label="Rivero's Street home">
      <Image
        src={logo}
        alt="Rivero's Street"
        height={h}
        width={Math.round((h * logo.width) / logo.height)}
        priority
        className="w-auto"
        style={{ height: h }}
      />
    </Link>
  );
}

export function FullWordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Rivero's Street"
      height={40}
      width={Math.round((40 * logo.width) / logo.height)}
      className={`h-10 w-auto ${className}`}
    />
  );
}
