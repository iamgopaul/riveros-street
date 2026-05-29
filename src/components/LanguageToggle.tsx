"use client";

import { useI18n, type Lang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const opts: Lang[] = ["en", "es"];
  return (
    <div className="inline-flex items-center border border-border font-mono text-[11px] uppercase tracking-widest">
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => setLang(o)}
          aria-pressed={lang === o}
          className={`px-2.5 h-7 transition-colors ${
            lang === o
              ? "bg-accent text-white"
              : "text-foreground/55 hover:text-accent"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
