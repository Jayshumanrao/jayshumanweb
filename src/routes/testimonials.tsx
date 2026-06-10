import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { FadeUp } from "@/components/section";
import { testimonials } from "@/lib/portfolio-data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Reviews & Testimonials" },
      { name: "description", content: "What clients say about working with Jayshuman Rao — feedback from founders, CMOs, and creative directors." },
      { property: "og:title", content: "Client Reviews" },
      { property: "og:description", content: "Feedback from founders, CMOs, and creative directors." },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
      <FadeUp>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">Reviews</p>
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
          What clients <span className="italic text-brand">say</span>.
        </h1>
      </FadeUp>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <FadeUp key={t.name} delay={i * 0.06}>
            <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-elegant">
              <div className="mb-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="flex-1 text-lg leading-relaxed">"{t.quote}"</p>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="grid size-12 place-items-center rounded-full bg-brand/15 font-bold text-brand">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-ink-muted">{t.title}</p>
                </div>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
