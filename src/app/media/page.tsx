"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { MEDIA, embedSrc, aspectClass, type MediaItem } from "@/lib/media";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/riverosstreet/" },
  { label: "TikTok", href: "https://www.tiktok.com/@riverosstreet" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61564006996188" },
];

export default function MediaPage() {
  const { t } = useI18n();
  const videos = MEDIA.map((m) => ({
    item: m,
    src: m.platform === "video" ? m.url : embedSrc(m),
  }));
  const hasVideos = videos.some((v) => v.src);

  return (
    <>
      <Nav variant="hub" />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
            <SectionHeader index="//" label={t("media.eyebrow")} />
            <h1 className="mt-5 font-mono font-bold uppercase tracking-tight leading-[0.85] text-[clamp(3rem,11vw,8rem)]">
              {t("media.title.a")}<br />
              <span className="gold-text spray">{t("media.title.b")}</span>
            </h1>
            <p className="mt-10 max-w-2xl text-foreground/70 text-lg leading-relaxed">{t("media.lede")}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          {hasVideos ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map(({ item, src }, i) =>
                src ? <Embed key={i} item={item} src={src} /> : null
              )}
            </div>
          ) : (
            <div className="border border-border p-12 text-center">
              <p className="font-mono uppercase tracking-widest text-foreground/60">
                Add video links in src/lib/media.ts to feature them here.
              </p>
              <p className="mt-3 text-sm text-foreground/40">
                Copy a video&apos;s share link from TikTok, Instagram, or Facebook.
              </p>
            </div>
          )}

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.4em] text-accent mr-2">{t("media.follow")}</span>
            {SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 h-12 border border-foreground/25 font-mono uppercase tracking-widest text-xs hover:border-accent hover:text-accent transition-colors"
              >
                {s.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Embed({ item, src }: { item: MediaItem; src: string }) {
  const ar = item.aspect ?? aspectClass(item.platform);
  return (
    <div className="border border-border overflow-hidden bg-black">
      <div className={`relative w-full ${ar}`}>
        {item.platform === "video" ? (
          <video
            src={src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls
          />
        ) : (
          <iframe
            src={src}
            title={`${item.platform} video`}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
      <div className="px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-foreground/40 border-t border-border">
        {item.platform === "video" ? "Rivero's Street" : item.platform}
      </div>
    </div>
  );
}
