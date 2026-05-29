"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/sites";
import { HOURS } from "@/lib/hours";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/riverosstreet/" },
  { label: "TikTok", href: "https://www.tiktok.com/@riverosstreet" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61564006996188" },
];

export default function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <>
      <Nav variant="hub" />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
            <SectionHeader index="//" label={t("contact.eyebrow")} />
            <h1 className="mt-5 font-mono font-bold uppercase tracking-tight leading-[0.85] text-[clamp(3rem,11vw,8rem)]">
              {t("contact.title.a")} <span className="gold-text spray">{t("contact.title.b")}</span>
            </h1>
            <p className="mt-10 max-w-2xl text-foreground/70 text-lg leading-relaxed">{t("contact.lede")}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-16 md:grid-cols-2">
          {/* details */}
          <div className="space-y-10">
            <Detail label={t("contact.addressLabel")}>
              30 Lowery Rd, Unit B<br />Freeport, FL 32439
            </Detail>
            <Detail label={t("contact.phoneLabel")}>
              <a href={PHONE_TEL} className="link-shimmer hover:text-accent transition-colors">{PHONE_DISPLAY}</a>
            </Detail>
            <Detail label={t("contact.hoursLabel")}>
              <div className="space-y-1">
                {HOURS.map(({ dayKey, time }) => (
                  <div key={dayKey} className="flex justify-between gap-8 max-w-xs">
                    <span className="text-foreground/60 uppercase tracking-widest text-xs pt-0.5">{t(`day.${dayKey}`)}</span>
                    <span className="font-mono">{time}</span>
                  </div>
                ))}
              </div>
            </Detail>
            <Detail label={t("contact.followLabel")}>
              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((s) => (
                  <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-shimmer hover:text-accent transition-colors">
                    {s.label}
                  </Link>
                ))}
              </div>
            </Detail>
          </div>

          {/* form */}
          <div>
            {sent ? (
              <div className="border border-accent p-12 text-center">
                <div className="text-xs uppercase tracking-[0.4em] text-accent mb-4">✓</div>
                <p className="font-mono uppercase text-2xl">{t("contact.formSent")}</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
                <Field label={t("contact.formName")} name="name" required />
                <Field label={t("contact.formEmail")} name="email" type="email" required />
                <label className="block">
                  <span className="block text-xs uppercase tracking-widest text-accent mb-2">{t("contact.formMessage")}</span>
                  <textarea name="message" rows={5} required className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 py-3 text-foreground transition-colors" />
                </label>
                <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 h-14 bg-accent text-white font-mono uppercase tracking-widest text-sm hover:bg-accent-soft transition-colors">
                  {t("contact.formSend")} →
                </button>
                <p className="text-xs text-foreground/40 uppercase tracking-widest">{t("contact.formDemo")}</p>
              </form>
            )}
          </div>
        </section>

        {/* map */}
        <section className="border-t border-border">
          <div className="border-b border-border overflow-hidden aspect-[16/6] grayscale contrast-125">
            <iframe
              title="Rivero's Street location map"
              src="https://www.google.com/maps?q=30+Lowery+Rd+Unit+B+Freeport+FL+32439&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.4em] text-accent mb-3">{label}</div>
      <div className="font-mono uppercase text-lg leading-snug text-foreground/90">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-accent mb-2">{label}</span>
      <input type={type} name={name} required={required} className="w-full bg-transparent border border-border focus:border-accent outline-none px-4 h-12 text-foreground transition-colors" />
    </label>
  );
}
