import { createFileRoute } from "@tanstack/react-router";
import { Award, GraduationCap } from "lucide-react";
import { FadeUp, SectionHeading } from "@/components/section";
import { skills, timeline } from "@/lib/portfolio-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Jayshuman Rao" },
      { name: "description", content: "Bio, career journey, education, and design skills of Jayshuman Rao, graphic designer and brand strategist." },
      { property: "og:title", content: "About — Jayshuman Rao" },
      { property: "og:description", content: "Bio, journey, and skills." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
      <FadeUp>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">About</p>
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
          Nine years of crafting <span className="italic text-brand">considered</span> brand systems.
        </h1>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="mt-12 grid gap-12 text-lg leading-relaxed text-ink-muted md:grid-cols-2">
          <p>
            I'm Jayshuman — a graphic designer and brand strategist based in London. I work with founders and teams who care
            deeply about how their work looks, feels, and reads. My practice spans identity systems, packaging,
            editorial, and digital product design.
          </p>
          <p>
            I believe restraint is a creative discipline, that strategy and craft are inseparable, and that the best
            brands feel inevitable in hindsight. Outside the studio, I teach typography workshops and write a weekly
            journal on the quiet craft of design.
          </p>
        </div>
      </FadeUp>

      {/* TIMELINE */}
      <section className="mt-32">
        <FadeUp>
          <SectionHeading eyebrow="Journey" title="Career & Education" />
        </FadeUp>
        <div className="mt-12 grid gap-10">
          {timeline.map((t, i) => (
            <FadeUp key={t.year} delay={i * 0.06}>
              <div className="grid grid-cols-[80px_1fr] gap-8 border-t border-border pt-8 md:grid-cols-[140px_1fr]">
                <p className="font-display text-2xl font-bold text-brand md:text-3xl">{t.year}</p>
                <div>
                  <h3 className="font-display text-xl font-bold md:text-2xl">{t.title}</h3>
                  <p className="mt-2 text-ink-muted">{t.subtitle}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-32">
        <FadeUp>
          <SectionHeading eyebrow="Toolkit" title="Skills & Software" />
        </FadeUp>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {skills.map((s, i) => (
            <FadeUp key={s.name} delay={i * 0.05}>
              <div>
                <div className="mb-3 flex items-end justify-between">
                  <span className="font-display text-lg font-bold">{s.name}</span>
                  <span className="text-sm font-bold text-brand">{s.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground transition-[width] duration-1000"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="mt-32">
        <FadeUp>
          <SectionHeading eyebrow="Recognition" title="Awards & Education" />
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { icon: Award, title: "14 Industry Awards", body: "Awwwards, Brand New, AIGA, Type Directors Club, European Design Awards." },
            { icon: GraduationCap, title: "BFA, RISD", body: "Rhode Island School of Design, Graphic Design with honors. AIGA student award recipient." },
          ].map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.08}>
              <div className="rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-elegant">
                <c.icon className="size-8 text-brand" />
                <h3 className="font-display mt-6 text-2xl font-bold">{c.title}</h3>
                <p className="mt-3 text-ink-muted">{c.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
