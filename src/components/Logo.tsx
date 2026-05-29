import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.webp";

export function Logo({
  href = "/",
  size = "md",
  tone = "default",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  /** "red" recolors the white wordmark to street red (used over the transparent hero nav) */
  tone?: "default" | "red";
}) {
  const heights = { sm: 28, md: 36, lg: 56 } as const;
  const h = heights[size];
  const w = Math.round((h * logo.width) / logo.height);

  if (tone === "red") {
    // Recolor the white wordmark by using it as an alpha mask filled with the brand red.
    return (
      <Link href={href} className="inline-flex items-center" aria-label="Rivero's Street home">
        <span
          aria-hidden
          style={{
            height: h,
            width: w,
            backgroundColor: "var(--accent)",
            maskImage: `url(${logo.src})`,
            WebkitMaskImage: `url(${logo.src})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "left center",
            WebkitMaskPosition: "left center",
          }}
        />
      </Link>
    );
  }

  return (
    <Link href={href} className="inline-flex items-center" aria-label="Rivero's Street home">
      <Image
        src={logo}
        alt="Rivero's Street"
        height={h}
        width={w}
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
