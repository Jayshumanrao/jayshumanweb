import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { FadeUp, SectionHeading } from "@/components/section";
import { services } from "@/lib/portfolio-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing" },
      { name: "description", content: "Identity, packaging, UI/UX, social, and motion design services with transparent pricing and timelines." },
      { property: "og:title", content: "Services & Pricing" },
      { property: "og:description", content: "Transparent pricing and timelines." },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
      <FadeUp>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">Services</p>
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
          Built for brands with <span className="italic text-brand">taste</span>.
        </h1>
      </FadeUp>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <FadeUp key={s.name} delay={i * 0.05}>
            <article
              className={`group flex h-full flex-col rounded-3xl border p-8 transition-all hover:shadow-elegant ${
                s.featured ? "border-brand bg-brand text-background" : "border-border bg-card"
              }`}
            >
              <div className="flex items-start justify-between">
                <h2 className="font-display text-2xl font-bold">{s.name}</h2>
                {s.featured && (
                  <span className="rounded-full bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand">
                    Popular
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold">{s.price}</span>
                <span className={`text-sm ${s.featured ? "text-background/70" : "text-ink-muted"}`}>
                  · {s.time}
                </span>
              </div>

              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`mt-0.5 size-4 shrink-0 ${s.featured ? "text-background" : "text-brand"}`} />
                    <span className={s.featured ? "text-background/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`group/btn mt-10 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition-transform hover:scale-[1.02] ${
                  s.featured
                    ? "bg-background text-foreground"
                    : "bg-foreground text-background"
                }`}
              >
                Order Now
                <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </article>
          </FadeUp>
        ))}
      </div>

      <section className="mt-32 rounded-3xl bg-foreground p-10 text-background md:p-16">
        <FadeUp>
          <SectionHeading eyebrow="Process" title="A simple, considered workflow." />
          <div className="mt-12 grid gap-10 md:grid-cols-4">
            {[
              ["01", "Discovery", "We align on goals, audience, and constraints."],
              ["02", "Strategy", "Brand positioning, references, and a creative brief."],
              ["03", "Design", "Concepts, iteration, and refinement together."],
              ["04", "Delivery", "Final files, guidelines, and handoff support."],
            ].map(([n, t, b]) => (
              <div key={n}>
                <p className="font-mono text-sm text-brand">{n}</p>
                <h3 className="font-display mt-3 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm text-background/70">{b}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
