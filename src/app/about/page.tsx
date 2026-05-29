"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Palm } from "@/components/Palm";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <Nav variant="hub" />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <Palm className="absolute -left-10 bottom-0 w-44 h-auto text-accent/10 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
            <SectionHeader index="//" label={t("about.eyebrow")} />
            <h1 className="mt-5 font-mono font-bold uppercase tracking-tight leading-[0.85] text-[clamp(3rem,11vw,8rem)]">
              {t("about.title.a")}<br />
              <span className="gold-text spray">{t("about.title.b")}</span>
            </h1>
            <p className="mt-10 max-w-2xl text-foreground/70 text-lg leading-relaxed">{t("about.lede")}</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24 grid gap-12 md:grid-cols-2">
          <p className="text-foreground/75 text-lg leading-relaxed">{t("about.body1")}</p>
          <p className="text-foreground/75 text-lg leading-relaxed">{t("about.body2")}</p>
        </section>

        <section className="border-t border-border">
          <div className="max-w-7xl mx-auto grid gap-px bg-border border-y border-border md:grid-cols-3">
            {[
              { i: "01", t: t("about.v1.title"), b: t("about.v1.body") },
              { i: "02", t: t("about.v2.title"), b: t("about.v2.body") },
              { i: "03", t: t("about.v3.title"), b: t("about.v3.body") },
            ].map((v) => (
              <div key={v.i} className="bg-background p-10">
                <div className="font-mono text-accent text-sm tracking-[0.3em] mb-6">{v.i}</div>
                <h3 className="font-mono font-bold uppercase text-2xl mb-4">{v.t}</h3>
                <p className="text-foreground/70 leading-relaxed">{v.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE TEAM ───────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <SectionHeader index="//" label={t("about.team")} title={t("about.team.title")} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Rivero", role: t("about.role.founder") },
              { name: "Name", role: t("about.role.chef") },
              { name: "Name", role: t("about.role.service") },
            ].map((m, i) => (
              <Member key={i} name={m.name} role={m.role} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Member({ name, role }: { name: string; role: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="panel panel-hover p-8 flex items-center gap-5">
      <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-mono font-bold text-lg text-white bg-gradient-to-br from-accent-soft via-accent to-accent-deep">
        {initials}
      </div>
      <div>
        <div className="font-mono font-bold uppercase text-xl">{name}</div>
        <div className="text-[11px] uppercase tracking-[0.3em] text-accent mt-1">{role}</div>
      </div>
    </div>
  );
}
