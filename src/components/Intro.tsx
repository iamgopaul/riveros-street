"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

type Phase = "in" | "leaving" | "done";

export function Intro() {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("in");
  const [host, setHost] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Section label shown under the logo, per subdomain. Defaults to the tagline
  // (also the SSR value, so no hydration mismatch) until host is known.
  const label = host.startsWith("eat.")
    ? t("nav.restaurant")
    : host.startsWith("shop.")
    ? t("nav.shop")
    : "Comida Venezolana Callejera";

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setPhase((p) => (p === "done" ? p : "leaving"));
    const t = setTimeout(() => setPhase("done"), 650);
    timers.current.push(t);
  }, []);

  useEffect(() => {
    setHost(window.location.hostname);
    // Plays on every full page load / refresh (the layout only mounts this on
    // hard loads, not on in-app navigation). Reduced-motion users skip it.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      return;
    }
    timers.current.push(setTimeout(() => finish(), 2400));

    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  if (phase === "done") return null;

  return (
    <div
      className={`intro-overlay ${phase === "leaving" ? "intro-leaving" : ""}`}
      onClick={finish}
      role="button"
      tabIndex={0}
      aria-label="Skip intro"
    >
      <div className="intro-stack">
        <span className="intro-logo" role="img" aria-label="Rivero's Street" />
        <span className="intro-line" />
        <span className="intro-tag">{label}</span>
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); finish(); }}
        className="absolute bottom-8 right-8 font-mono uppercase tracking-[0.3em] text-[11px] text-foreground/50 hover:text-accent transition-colors"
      >
        Skip →
      </button>
    </div>
  );
}
