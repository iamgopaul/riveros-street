"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductMedia({
  images,
  alt,
  sizes,
  priority = false,
  interval = 2600,
}: {
  images?: string[];
  alt: string;
  sizes: string;
  priority?: boolean;
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!images || images.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={src} className="relative h-full w-full shrink-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className="object-cover"
              priority={priority && idx === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((src, idx) => (
            <span
              key={src}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                idx === i ? "bg-accent" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
