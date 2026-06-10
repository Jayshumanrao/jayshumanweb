import { createFileRoute } from "@tanstack/react-router";
import { Award, MapPin, Languages, CheckCircle2 } from "lucide-react";
import { FadeUp, SectionHeading } from "@/components/section";
import { skills, timeline } from "@/lib/portfolio-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Jayshuman Rao" },
      { name: "description", content: "Professional bio, skills, and specializations of Jayshuman Rao, a passionate Graphic Designer based in Azamgarh, Uttar Pradesh, India." },
      { property: "og:title", content: "About — Jayshuman Rao" },
      { property: "og:description", content: "Bio, skills, and specializations." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const specializations = [
  "Logo Design",
  "Brand Identity Design",
  "Social Media Graphics",
  "Website Making",
  "Print Design",
  "Marketing Creatives",
  "Portfolio Website Design",
];

const whyWorkWithMe = [
  "Creative & Original Concepts",
  "Fast Communication",
  "Modern Design Trends",
  "Client-Focused Approach",
  "Timely Delivery",
  "Unlimited Creativity",
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
      <FadeUp>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">About</p>
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
          Graphic Designer <span className="italic text-brand">|</span> Brand Identity
          <br />
          Specialist <span className="italic text-brand">|</span> Creative Visual Storyteller
        </h1>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div className="mt-12 grid gap-12 text-lg leading-relaxed text-ink-muted md:grid-cols-2">
          <p>
            Hello! I'm Jayshuman Rao — a passionate Graphic Designer based in Azamgarh, Uttar Pradesh, India.
            I specialize in creating visually compelling designs that help businesses build strong brand identities
            and connect with their audience effectively.
          </p>
          <p>
            With expertise in branding, logo design, social media creatives, marketing materials, and modern
            digital experiences, I combine creativity with strategic thinking to deliver designs that are both
            beautiful and impactful.
          </p>
        </div>
      </FadeUp>

      {/* LOCATION & LANGUAGES */}
      <section className="mt-16">
        <FadeUp>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <div className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Location</p>
                <p className="mt-1 font-semibold">Azamgarh, Uttar Pradesh, India</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
              <div className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                <Languages className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Languages</p>
                <p className="mt-1 font-semibold">English, Hindi</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* SPECIALIZATIONS */}
      <section className="mt-32">
        <FadeUp>
          <SectionHeading eyebrow="Expertise" title="Specializations" />
        </FadeUp>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specializations.map((s, i) => (
            <FadeUp key={s} delay={i * 0.05}>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-brand/30 hover:shadow-elegant">
                <CheckCircle2 className="size-5 shrink-0 text-brand" />
                <span className="font-medium">{s}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mt-32">
        <FadeUp>
          <SectionHeading eyebrow="Journey" title="Career & Experience" />
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

      {/* WHY WORK WITH ME */}
      <section className="mt-32">
        <FadeUp>
          <SectionHeading eyebrow="Trust" title="Why Work With Me" />
        </FadeUp>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {whyWorkWithMe.map((item, i) => (
            <FadeUp key={item} delay={i * 0.06}>
              <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-elegant">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{item}</h3>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="mt-32">
        <FadeUp>
          <div className="rounded-3xl bg-foreground p-10 text-background md:p-16">
            <SectionHeading
              eyebrow="Mission"
              title="My Goal"
              subtitle=""
            />
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-background/80 md:text-2xl">
              My goal is simple: create meaningful visual solutions that help brands stand out in today's competitive
              digital world. Every project is approached with attention to detail, innovation, and a commitment to excellence.
              Whether you're a startup looking for a unique identity or an established business seeking a fresh visual
              direction, I'm here to bring your vision to life.
            </p>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
