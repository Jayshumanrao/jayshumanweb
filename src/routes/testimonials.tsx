import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { FadeUp } from "@/components/section";
import { testimonials } from "@/lib/portfolio-data";

const SITE_URL = "https://jayshumanweb.lovable.app";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Reviews & Testimonials — Jayshuman Rao" },
      { name: "description", content: "What clients say about working with Jayshuman Rao — feedback from founders, business owners, and marketing heads across India." },
      { property: "og:title", content: "Client Reviews & Testimonials" },
      { property: "og:description", content: "Feedback from founders, business owners, and marketing heads." },
      { property: "og:url", content: SITE_URL + "/testimonials" },
      { name: "twitter:title", content: "Client Reviews & Testimonials" },
      { name: "twitter:description", content: "Feedback from founders and business owners." },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [i, setI] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setI((v) => {
      const next = v + newDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => paginate(1), 5000);
    return () => clearInterval(id);
  }, [isPaused, paginate]);

  const t = testimonials[i];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32">
      <FadeUp>
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-brand sm:mb-6">Reviews</p>
        <h1 className="font-display mx-auto max-w-4xl text-center text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
          What clients <span className="italic text-brand">say</span>.
        </h1>
      </FadeUp>

      <div
        className="relative mt-10 sm:mt-14 md:mt-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={t.name}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 260, damping: 28 }, opacity: { duration: 0.35 }, scale: { duration: 0.35 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 60) paginate(-1);
              else if (info.offset.x < -60) paginate(1);
            }}
            className="mx-auto max-w-4xl cursor-grab active:cursor-grabbing"
          >
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-10 md:p-14">
              <Quote className="absolute left-4 top-4 size-8 text-brand/20 sm:left-6 sm:top-6 sm:size-10 md:size-12" />

              <div className="mb-5 flex justify-center gap-1 sm:mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-4 fill-brand text-brand sm:size-5" />
                ))}
              </div>

              <p className="text-center text-base leading-relaxed text-foreground sm:text-lg md:text-xl md:leading-relaxed">
                "{t.quote}"
              </p>

              <div className="mt-6 flex items-center justify-center gap-3 border-t border-border pt-6 sm:mt-8 sm:gap-4">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="size-11 rounded-full object-cover ring-2 ring-brand/20 sm:size-12" />
                ) : (
                  <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand to-gold font-bold text-navy sm:size-12">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-bold sm:text-base">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-ink-muted sm:text-xs">{t.title}</p>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous testimonial"
          className="absolute top-1/2 -left-1 -translate-y-1/2 rounded-full border border-border bg-card p-2 shadow-sm transition-all hover:bg-accent sm:-left-4 md:-left-6"
        >
          <ChevronLeft className="size-5 text-foreground" />
        </button>
        <button
          onClick={() => paginate(1)}
          aria-label="Next testimonial"
          className="absolute top-1/2 -right-1 -translate-y-1/2 rounded-full border border-border bg-card p-2 shadow-sm transition-all hover:bg-accent sm:-right-4 md:-right-6"
        >
          <ChevronRight className="size-5 text-foreground" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-2 sm:mt-8">
        {testimonials.map((_, k) => (
          <button
            key={k}
            onClick={() => {
              setDirection(k > i ? 1 : -1);
              setI(k);
            }}
            aria-label={`Show testimonial ${k + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-brand" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
          />
        ))}
      </div>

      {/* Mobile grid fallback */}
      <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, idx) => (
          <FadeUp key={t.name} delay={idx * 0.06}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-elegant sm:rounded-3xl sm:p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-3 fill-brand text-brand sm:size-4" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-foreground sm:text-base">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 sm:mt-5 sm:gap-4">
                {t.image ? (
                  <img src={t.image} alt={t.name} className="size-9 rounded-full object-cover ring-2 ring-brand/20 sm:size-10" />
                ) : (
                  <div className="grid size-9 place-items-center rounded-full bg-brand/15 font-bold text-brand sm:size-10">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-ink-muted sm:text-xs">{t.title}</p>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
