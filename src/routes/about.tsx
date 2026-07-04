import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Rocket,
  Target,
  Award,
  ArrowRight,
  BadgeCheck,
  Code2,
  Palette,
  Gauge,
  Smartphone,
  Search,
  ShieldCheck,
  MessageSquare,
  Clock,
} from "lucide-react";
import founderAsset from "@/assets/jayshuman-founder-new.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Jayshuman Rao | Full-Stack Web Developer & Designer" },
      {
        name: "description",
        content:
          "Jayshuman Rao — Full-Stack Web Developer & Graphic Designer building premium, high-performance websites that help businesses grow online.",
      },
      { property: "og:title", content: "About — Jayshuman Rao" },
      {
        property: "og:description",
        content:
          "Premium web development, modern UI/UX, and branding designed to convert visitors into customers.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

/* ---------- Single-source-of-truth content ---------- */
const aboutData = {
  badge: "ABOUT ME",
  heading: "Crafting High-Performance Websites That Drive Business Growth",
  subtitle:
    "Helping businesses establish a powerful online presence through modern web development, clean design, and seamless user experiences.",
  description: [
    "Hi, I'm Jayshuman Rao, a passionate Full-Stack Web Developer and Graphic Designer specializing in creating premium websites that combine modern design, high performance, and exceptional user experience.",
    "I build responsive business websites, landing pages, portfolio websites, and custom web applications tailored to each client's goals. Every project is developed with a strong focus on speed, SEO, scalability, accessibility, and clean code to ensure long-term success.",
    "Beyond development, I also create professional branding assets including logos, social media graphics, banners, posters, and marketing materials that help businesses build a memorable brand identity.",
    "I believe every business deserves a website that not only looks impressive but also converts visitors into customers. My mission is to deliver digital solutions that help businesses grow with confidence.",
  ],
  profileImage: founderAsset.url,
  experienceBadge: "1+ Years Building Modern Websites",
  availabilityBadge: "Available for Freelance Projects",
  technologies: [
    { name: "React", label: "⚛️" },
    { name: "Next.js", label: "N" },
    { name: "HTML5", label: "5" },
    { name: "CSS3", label: "#" },
    { name: "JavaScript", label: "JS" },
    { name: "Tailwind", label: "TW" },
    { name: "Firebase", label: "🔥" },
    { name: "GitHub", label: "GH" },
  ],
  cards: [
    {
      title: "Who I Am",
      icon: Sparkles,
      body:
        "Professional Web Developer & Graphic Designer passionate about building modern, scalable, and visually engaging digital experiences.",
    },
    {
      title: "My Expertise",
      icon: Code2,
      list: [
        "Business Websites",
        "Landing Pages",
        "Portfolio Websites",
        "Responsive Web Design",
        "UI/UX Design",
        "Website Redesign",
        "SEO Optimization",
        "Graphic Design",
      ],
    },
    {
      title: "Why Clients Choose Me",
      icon: Award,
      list: [
        "Premium Modern Design",
        "Fast Loading Performance",
        "Mobile-First Development",
        "Clean & Maintainable Code",
        "SEO-Friendly Structure",
        "Responsive on Every Device",
        "Reliable Communication",
        "On-Time Delivery",
      ],
    },
    {
      title: "My Mission",
      icon: Target,
      body:
        "Helping startups, entrepreneurs, and businesses establish a strong digital presence with beautiful, fast, and conversion-focused websites.",
    },
  ],
  stats: [
    { label: "Projects Completed", value: 40, suffix: "+" },
    { label: "Happy Clients", value: 30, suffix: "+" },
    { label: "Years of Experience", value: 1, suffix: "+" },
    { label: "Client Satisfaction", value: 100, suffix: "%" },
  ],
  ctas: {
    primary: { label: "Hire Me", to: "/contact" },
    secondary: { label: "View My Work", to: "/portfolio" },
  },
};

/* ---------- Animated counter ---------- */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ---------- Page ---------- */
function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_60%)] blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.28),transparent_60%)] blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/3 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_60%)] blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 backdrop-blur-xl">
            <Sparkles className="size-3.5" />
            {aboutData.badge}
          </span>
          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.1] md:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {aboutData.heading}
            </span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 md:text-xl">
            {aboutData.subtitle}
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* Gradient border frame */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 p-[2px] shadow-2xl shadow-purple-500/20">
                <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-2px)] bg-background">
                  {/* Animated bg */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.35),transparent_60%)]" />
                  <motion.img
                    src={aboutData.profileImage}
                    alt="Jayshuman Rao — Full-Stack Web Developer & Graphic Designer"
                    className="relative h-full w-full object-cover"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/20 bg-background/70 px-4 py-2.5 text-sm font-semibold shadow-xl backdrop-blur-xl"
              >
                <BadgeCheck className="size-5 text-cyan-400" />
                {aboutData.experienceBadge}
              </motion.div>

              {/* Availability card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                animate={{ y: [0, -6, 0] }}
                className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl border border-white/20 bg-background/70 px-4 py-3 shadow-xl backdrop-blur-xl"
              >
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold">{aboutData.availabilityBadge}</span>
              </motion.div>

              {/* Floating tech icons */}
              {aboutData.technologies.map((t, i) => {
                const angle = (i / aboutData.technologies.length) * Math.PI * 2;
                const radius = 52; // percent-based via CSS
                const left = 50 + Math.cos(angle) * radius;
                const top = 50 + Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={t.name}
                    className="pointer-events-none absolute hidden sm:flex"
                    style={{ left: `${left}%`, top: `${top}%`, translate: "-50% -50%" }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  >
                    <div className="grid size-11 place-items-center rounded-xl border border-white/20 bg-background/80 text-xs font-bold shadow-lg backdrop-blur-xl">
                      {t.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — description + cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-base leading-relaxed text-foreground/75 md:text-lg"
            >
              {aboutData.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {aboutData.cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group relative rounded-2xl p-[1.5px] transition-transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/60 via-purple-500/60 to-cyan-400/60 opacity-60 transition-opacity group-hover:opacity-100" />
                    <div className="relative h-full rounded-[calc(1rem-1px)] border border-white/10 bg-background/70 p-6 backdrop-blur-xl">
                      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-400/20 text-cyan-300 ring-1 ring-white/10">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-display text-lg font-bold">{card.title}</h3>
                      {card.body && (
                        <p className="mt-2 text-sm text-foreground/70">{card.body}</p>
                      )}
                      {card.list && (
                        <ul className="mt-3 grid gap-1.5">
                          {card.list.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {aboutData.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl p-[1.5px]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-cyan-400/50" />
              <div className="relative rounded-[calc(1rem-1px)] border border-white/10 bg-background/70 p-6 text-center backdrop-blur-xl">
                <div className="font-display bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-foreground/70">
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to={aboutData.ctas.primary.to}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-0.5"
          >
            <Rocket className="size-4" />
            {aboutData.ctas.primary.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to={aboutData.ctas.secondary.to}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold backdrop-blur-xl transition-all hover:bg-white/10 hover:-translate-y-0.5"
          >
            {aboutData.ctas.secondary.label}
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

/* Silence unused-import warnings for icons referenced only via card.icon typing */
void Palette; void Gauge; void Smartphone; void Search; void ShieldCheck; void MessageSquare; void Clock;
