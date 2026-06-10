import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { FadeUp } from "@/components/section";
import { categories, projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Selected Works" },
      { name: "description", content: "A filterable gallery of identity systems, packaging, UI design, motion, and editorial work." },
      { property: "og:title", content: "Portfolio — Selected Works" },
      { property: "og:description", content: "Identity, packaging, UI, motion, editorial." },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter(
      (p) =>
        (active === "All" || p.category === active) &&
        (q.trim() === "" || (p.title + p.description + p.client).toLowerCase().includes(q.toLowerCase()))
    );
  }, [active, q]);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
      <FadeUp>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">Portfolio</p>
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
          Selected <span className="italic text-brand">works</span>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-muted">
          A curated archive of identity, packaging, digital product, and editorial design.
        </p>
      </FadeUp>

      {/* FILTERS */}
      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-ink-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Search projects..."
            aria-label="Search projects"
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-foreground md:w-72"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
        {filtered.length === 0 && (
          <p className="col-span-full py-20 text-center text-ink-muted">No projects match your search.</p>
        )}
        {filtered.map((p, i) => {
          const span =
            p.size === "large" ? "md:col-span-8 aspect-[16/10]" :
            p.size === "wide" ? "md:col-span-8 aspect-[2/1]" :
            p.size === "tall" ? "md:col-span-4 aspect-[3/4]" :
            "md:col-span-4 aspect-square";
          return (
            <FadeUp key={p.slug} delay={(i % 6) * 0.05} className={span.split(" ")[0]}>
              <button
                onClick={() => setLightbox(p.image)}
                className="group block w-full text-left"
                aria-label={`Open ${p.title}`}
              >
                <div className={`overflow-hidden rounded-3xl bg-muted ${span.split(" ")[1]}`}>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">{p.category}</p>
                    <h2 className="mt-2 font-display text-xl font-bold">{p.title}</h2>
                    <p className="mt-1 text-sm text-ink-muted">{p.description}</p>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">{p.year}</span>
                </div>
              </button>
            </FadeUp>
          );
        })}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-6 backdrop-blur-sm animate-fade-up"
          role="dialog"
          aria-modal
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-6 right-6 grid size-12 place-items-center rounded-full bg-background text-foreground"
          >
            <X className="size-5" />
          </button>
          <img src={lightbox} alt="Project preview" className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-elegant" />
        </div>
      )}
    </div>
  );
}
