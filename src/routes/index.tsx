import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import portrait from "@/assets/designer-portrait.jpg";
import { projects, testimonials } from "@/lib/portfolio-data";
import { FadeUp, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elara Vance — Graphic Designer & Brand Strategist" },
      { name: "description", content: "Award-winning portfolio of Elara Vance: identity systems, packaging, and digital product design for forward-thinking brands." },
      { property: "og:title", content: "Elara Vance — Graphic Designer & Brand Strategist" },
      { property: "og:description", content: "Award-winning portfolio of Elara Vance." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.slice(0, 3);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float-slow absolute top-[-10%] left-[-10%] size-[55%] rounded-full bg-brand/10 blur-[140px]" />
          <div className="animate-float-slow absolute bottom-[-10%] right-[-15%] size-[55%] rounded-full bg-brand/15 blur-[140px] [animation-delay:-4s]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Available for Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="font-display mt-6 text-5xl font-bold leading-[0.95] md:text-7xl lg:text-[5.5rem]"
            >
              Graphic <br />
              Designer <span className="text-brand">&</span>
              <br />
              Brand Strategist
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink-muted"
            >
              I craft elevated visual identities and digital experiences for brands that refuse to be ordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 rounded-2xl bg-foreground px-7 py-4 text-sm font-bold text-background transition-transform hover:scale-[1.02]"
              >
                View Portfolio
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-7 py-4 text-sm font-bold text-foreground transition-all hover:border-foreground"
              >
                Hire Me
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-2 rounded-[28px] border border-brand/30" aria-hidden />
            <img
              src={portrait}
              alt="Portrait of Elara Vance, graphic designer and brand strategist"
              width={1024}
              height={1280}
              className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-elegant grayscale transition-all duration-700 hover:grayscale-0"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-6 shadow-elegant md:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full border-2 border-card bg-brand" />
                  <div className="size-8 rounded-full border-2 border-card bg-foreground" />
                  <div className="size-8 rounded-full border-2 border-card bg-amber-400" />
                </div>
                <span className="text-sm font-bold">120+ Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
          {[
            ["120+", "Projects Completed"],
            ["85", "Happy Clients"],
            ["09", "Years Experience"],
            ["14", "Design Awards"],
          ].map(([n, l], i) => (
            <FadeUp key={l} delay={i * 0.08}>
              <div className="text-center md:text-left">
                <div className="font-display text-5xl font-bold tracking-tight md:text-6xl">{n}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink-muted">{l}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <FadeUp>
            <SectionHeading
              eyebrow="Selection"
              title="Featured Works"
              subtitle="A curation of recent identity systems and digital products."
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link to="/portfolio" className="group inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold">
              See all work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.1}>
              <Link to="/portfolio" className="group block">
                <div className="overflow-hidden rounded-3xl bg-muted aspect-[4/5]">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={1000}
                    height={1250}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">{p.category}</p>
                    <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
                  </div>
                  <div className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-background">
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="border-y border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.4em] text-ink-muted">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 opacity-50">
            {["MODERNA", "Sartoria", "HELIX", "FRAME", "Lumina", "001—TECH"].map((b) => (
              <span key={b} className="font-display text-xl font-bold tracking-tight">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-foreground p-10 text-background md:p-16">
            <span aria-hidden className="absolute top-4 right-8 font-display text-[180px] leading-none text-background/10">"</span>
            <div className="relative">
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-brand text-brand" />
                ))}
              </div>
              <p className="font-display text-2xl leading-relaxed md:text-3xl">
                "{testimonials[0].quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full bg-brand/20 font-bold text-background">
                  {testimonials[0].name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{testimonials[0].name}</p>
                  <p className="text-xs uppercase tracking-widest text-background/60">{testimonials[0].title}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
