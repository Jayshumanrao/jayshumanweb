import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FadeUp } from "@/components/section";
import { posts } from "@/lib/portfolio-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Writing on Design" },
      { name: "description", content: "Essays and tutorials on branding, typography, design process, and the craft of visual systems." },
      { property: "og:title", content: "Journal — Writing on Design" },
      { property: "og:description", content: "Essays and tutorials on branding and typography." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const cats = ["All", "Trends", "Tutorials", "Inspiration", "Process"];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => posts.filter((p) => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase())),
    [cat, q]
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
      <FadeUp>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">Journal</p>
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
          Notes on the <span className="italic text-brand">craft</span>.
        </h1>
      </FadeUp>

      {/* Featured */}
      <FadeUp delay={0.1}>
        <article className="mt-16 grid gap-8 rounded-3xl border border-border bg-card p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand/30 via-brand/10 to-muted" />
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">Featured · {posts[0].category}</span>
            <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">{posts[0].title}</h2>
            <p className="mt-4 text-ink-muted">{posts[0].excerpt}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-ink-muted">{posts[0].date} · 6 min read</p>
          </div>
        </article>
      </FadeUp>

      {/* Filters */}
      <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                cat === c
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
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-foreground md:w-72"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <FadeUp key={p.slug} delay={(i % 6) * 0.05}>
            <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:shadow-elegant">
              <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-brand/15 to-muted" />
              <div className="mt-6 flex-1">
                <span className="text-xs font-bold uppercase tracking-widest text-brand">{p.category}</span>
                <h3 className="font-display mt-3 text-xl font-bold transition-colors group-hover:text-brand">{p.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{p.excerpt}</p>
              </div>
              <p className="mt-6 text-xs uppercase tracking-widest text-ink-muted">{p.date}</p>
            </article>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
