"use client";

import { useEffect, useRef, useState } from "react";
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
  const { t } = useI18n();
  const ar = item.aspect ?? aspectClass(item.platform);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Self-hosted clips and the TikTok player both support mute control; IG/FB
  // embeds don't expose a cross-origin API, so we hide the button for them.
  const controllable = item.platform === "video" || item.platform === "tiktok";

  // keep the native video element in sync with state
  useEffect(() => {
    if (item.platform === "video" && videoRef.current) videoRef.current.muted = muted;
  }, [muted, item.platform]);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (item.platform === "tiktok") {
      // TikTok Player v1 postMessage API
      iframeRef.current?.contentWindow?.postMessage(
        { type: next ? "mute" : "unMute", "x-tiktok-player": true },
        "*"
      );
    }
  }

  return (
    <div className="border border-border overflow-hidden bg-black">
      <div className={`relative w-full ${ar}`}>
        {item.platform === "video" ? (
          <video
            ref={videoRef}
            src={src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <iframe
            ref={iframeRef}
            src={src}
            title={`${item.platform} video`}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}

        {controllable && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? t("media.unmute") : t("media.mute")}
            aria-pressed={!muted}
            className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center h-10 w-10 bg-background/70 backdrop-blur border border-border text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5 6 9H3v6h3l5 4V5z" />
                <path d="m22 9-6 6M16 9l6 6" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5 6 9H3v6h3l5 4V5z" />
                <path d="M16 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12" />
              </svg>
            )}
          </button>
        )}
      </div>
      <div className="px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-foreground/40 border-t border-border">
        {item.platform === "video" ? "Rivero's Street" : item.platform}
      </div>
    </div>
  );
}
