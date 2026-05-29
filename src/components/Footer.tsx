"use client";

import { FullWordmark } from "./Logo";
import { AwardBadge } from "./AwardBadge";
import { useI18n } from "@/lib/i18n";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/sites";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border mt-32">
      <div className="h-1 w-full sunset-bar" />
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 flex items-start justify-between gap-6">
          <div>
            <FullWordmark className="text-sm" />
            <p className="mt-4 text-foreground/60 max-w-sm text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>
          <AwardBadge className="w-20 sm:w-24 shrink-0" />
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-accent mb-4">{t("footer.visit")}</h4>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {t("footer.address")}<br />
            {t("footer.hours")}<br />
            <a href={PHONE_TEL} className="link-shimmer hover:text-accent">{PHONE_DISPLAY}</a>
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-accent mb-4">{t("footer.follow")}</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><a href="https://www.instagram.com/riverosstreet/" target="_blank" rel="noopener noreferrer" className="link-shimmer hover:text-accent">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@riverosstreet" target="_blank" rel="noopener noreferrer" className="link-shimmer hover:text-accent">TikTok</a></li>
            <li><a href="https://www.facebook.com/profile.php?id=61564006996188" target="_blank" rel="noopener noreferrer" className="link-shimmer hover:text-accent">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-foreground/40">
          <span>© {new Date().getFullYear()} Rivero&apos;s Street</span>
          <span className="font-mono uppercase tracking-widest">{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
