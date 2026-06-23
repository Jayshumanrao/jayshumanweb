import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  PenTool,
  Layout,
  ShoppingBag,
  Sparkles,
  Star,
  Check,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Github,
  Search,
  ClipboardList,
  Rocket,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/portfolio-data";
import { FadeUp, SectionHeading } from "@/components/section";
import founderAsset from "@/assets/jayshuman-founder.webp.asset.json";
import bannerAsset from "@/assets/jayshuman-banner.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jayshuman Rao — Premium Web Development & Graphic Design Studio" },
      { name: "description", content: "Premium websites and graphic designs that grow your business. Freelance web developer and graphic designer building luxurious, conversion-focused brands." },
      { property: "og:title", content: "Jayshuman Rao — Premium Web & Graphic Design" },
      { property: "og:description", content: "Premium websites and graphic designs that grow your business." },
    ],
  }),
  component: Home,
});

// ---------- Animated Counter ----------
function Counter({ to, suffix = "+", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.floor(to * eased));
              if (p < 1) requestAnimationFrame(tick);
              else setN(to);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// ---------- Mouse-follow glow ----------
function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden size-[500px] rounded-full bg-brand/20 blur-[120px] lg:block"
    />
  );
}

// ---------- Particles ----------
function Particles() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 6,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-gold/60"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            animation: `float-y ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ---------- 3D Tilt wrapper ----------
function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 will-change-transform ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

// ---------- Data ----------
const services = [
  { icon: Code2, title: "Web Development", desc: "Fast, secure, scalable websites with modern stacks and pixel-perfect UI." },
  { icon: Palette, title: "Graphic Design", desc: "Marketing creatives, social media, and editorial design with brand consistency." },
  { icon: PenTool, title: "Logo Design", desc: "Distinctive marks and identity systems that scale across every touchpoint." },
  { icon: Layout, title: "UI / UX Design", desc: "Research-driven interfaces engineered for clarity, conversion, and craft." },
  { icon: Sparkles, title: "Landing Pages", desc: "High-conversion landing pages built to launch products and capture leads." },
  { icon: ShoppingBag, title: "E-commerce Websites", desc: "Custom Shopify and headless storefronts engineered for revenue growth." },
];

const portfolio = [
  { title: "Nova Finance App", category: "Web", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80" },
  { title: "Aurora Skincare", category: "Graphic", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80" },
  { title: "Helix SaaS", category: "Web", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80" },
  { title: "Sartoria Brand", category: "Graphic", img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=900&q=80" },
  { title: "Verve Coffee", category: "Web", img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=900&q=80" },
  { title: "Lumen Identity", category: "Graphic", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80" },
];

const processSteps = [
  { icon: Search, title: "Discovery", desc: "Deep-dive into your goals, audience, and competitors." },
  { icon: ClipboardList, title: "Planning", desc: "Strategy, sitemap, and a tight project roadmap." },
  { icon: PenTool, title: "Design", desc: "Concepts, wireframes, and pixel-perfect mockups." },
  { icon: Code2, title: "Development", desc: "Clean, scalable code with modern best practices." },
  { icon: Rocket, title: "Launch", desc: "QA, deploy, and post-launch support to keep you growing." },
];

const pricing = [
  {
    name: "Basic",
    price: "$499",
    desc: "Perfect for solopreneurs needing a polished web presence.",
    features: ["1-3 page website", "Mobile responsive", "Basic SEO setup", "Contact form", "7 day delivery"],
  },
  {
    name: "Professional",
    price: "$1,299",
    desc: "For growing brands ready to scale online.",
    features: ["Up to 8 pages", "Custom UI/UX design", "Advanced SEO", "Blog/CMS integration", "Analytics + tracking", "Priority support"],
    featured: true,
  },
  {
    name: "Premium",
    price: "$2,999",
    desc: "Full agency-grade design + development engagement.",
    features: ["Unlimited pages", "Brand identity package", "E-commerce ready", "Custom integrations", "Performance tuning", "3 months support"],
  },
];

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="relative">
      <MouseGlow />

      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <Particles />

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div style={{ y }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gold" />
              </span>
              Available for Premium Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="font-display mt-6 text-5xl font-extrabold leading-[1] md:text-7xl lg:text-[5rem]"
            >
              <span className="inline-block rounded-xl border border-gold/40 bg-gradient-to-br from-brand/25 to-gold/25 px-3 text-gold shadow-gold">Premium</span> Websites & Graphic Designs That Grow Your Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              I'm Jayshuman Rao — a freelance designer and developer building luxurious digital experiences for ambitious founders, modern brands, and growing agencies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand to-gold px-8 py-4 text-sm font-bold text-background shadow-glow transition-transform hover:scale-[1.03]"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                Hire Me
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-foreground transition-all hover:border-gold hover:text-gold"
              >
                View Portfolio
              </a>
            </motion.div>

            <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-ink-muted">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="font-semibold text-foreground">5.0</span> from 60+ reviews
              </div>
              <div className="hidden h-4 w-px bg-border md:block" />
              <span>Trusted by founders in 12+ countries</span>
            </div>
          </motion.div>

          {/* 3D illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-gold/30" />
            <div className="absolute inset-8 animate-spin-slow rounded-full border border-dashed border-brand/30 [animation-direction:reverse]" />

            <div className="absolute inset-8 sm:inset-12 lg:inset-16 grid place-items-center">
              <div className="relative size-full">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand via-brand/60 to-gold blur-2xl opacity-60" />
                <Tilt className="relative grid size-full place-items-center rounded-3xl glass-strong shadow-elegant p-4 sm:p-6">
                  <div className="text-center">
                    <div className="relative mx-auto size-32 sm:size-36 lg:size-40 overflow-hidden rounded-2xl ring-2 ring-gold/40 shadow-glow">
                      <img
                        src={founderAsset.url}
                        alt="Jayshuman Rao — Founder of JR Design Studio"
                        className="size-full object-cover"
                      />
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-gold">JR Design Studio</p>
                    <p className="mt-2 font-display text-xl font-bold text-foreground">(Jayshuman Rao)</p>
                    <p className="mt-1 text-sm font-medium text-ink-muted">Founder</p>
                  </div>
                </Tilt>
              </div>
            </div>

            {/* floating icons */}
            <div className="absolute -top-2 right-2 sm:right-6 grid size-10 sm:size-12 lg:size-14 animate-float-y place-items-center rounded-2xl glass-strong text-brand shadow-glow">
              <Code2 className="size-5 sm:size-6" />
            </div>
            <div className="absolute bottom-4 -left-2 grid size-10 sm:size-12 lg:size-14 animate-float-y place-items-center rounded-2xl glass-strong text-gold shadow-gold [animation-delay:-2s]">
              <Palette className="size-5 sm:size-6" />
            </div>
            <div className="absolute top-1/2 -right-2 sm:-right-4 grid size-9 sm:size-10 lg:size-12 animate-float-y place-items-center rounded-2xl glass-strong text-brand [animation-delay:-4s]">
              <Sparkles className="size-4 sm:size-5" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ BANNER ============ */}
      <section className="mx-auto max-w-7xl px-6 pb-6 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative overflow-hidden rounded-2xl border border-gold/20 shadow-glow md:rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand/10 via-transparent to-gold/10" />
          <img
            src={bannerAsset.url}
            alt="Jayshuman Rao — Graphic Designer, Web Developer & AI Expert"
            className="relative z-10 aspect-[4/1] w-full object-cover"
            loading="eager"
          />
        </motion.div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative border-y border-border/50 bg-gradient-to-r from-navy/5 via-brand/5 to-gold/5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
          {[
            { n: 50, s: "+", l: "Projects Completed" },
            { n: 20, s: "+", l: "Happy Clients" },
            { n: 3, s: "+", l: "Years Experience" },
            { n: 12, s: "+", l: "Countries Served" },
          ].map((s, i) => (
            <FadeUp key={s.l} delay={i * 0.08}>
              <div className="text-center">
                <div className="font-display text-5xl font-extrabold tracking-tight text-gradient-brand md:text-6xl">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink-muted">{s.l}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <FadeUp>
          <SectionHeading
            eyebrow="What I Do"
            title="Services Built for Premium Brands"
            subtitle="Full-stack design and development — from first sketch to last line of code."
            align="center"
          />
        </FadeUp>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
                <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br from-brand to-gold opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
                <div className="relative">
                  <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand/20 to-gold/20 text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <s.icon className="size-7" />
                  </div>
                  <h3 className="font-display mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ============ PORTFOLIO ============ */}
      <PortfolioSection />

      {/* ============ PROCESS ============ */}
      <section id="process" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <FadeUp>
          <SectionHeading
            eyebrow="How I Work"
            title="A Process Designed for Results"
            align="center"
          />
        </FadeUp>

        <div className="relative mt-20">
          <div aria-hidden className="absolute top-7 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-brand to-transparent lg:block" />
          <div className="grid gap-10 lg:grid-cols-5">
            {processSteps.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="relative mx-auto grid size-14 place-items-center rounded-full bg-background ring-1 ring-border">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand to-gold opacity-20 blur-md" />
                    <p.icon className="relative size-6 text-brand" />
                  </div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-gold">Step {i + 1}</p>
                  <h3 className="font-display mt-2 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{p.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <TestimonialCarousel />

      {/* ============ PRICING ============ */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <FadeUp>
          <SectionHeading
            eyebrow="Pricing"
            title="Transparent Plans, Premium Outcomes"
            subtitle="Choose a starting point — every project is custom-tailored to your goals."
            align="center"
          />
        </FadeUp>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricing.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.08}>
              <div
                className={`relative h-full rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                  p.featured
                    ? "bg-gradient-to-br from-brand to-navy text-background shadow-glow ring-2 ring-gold"
                    : "glass hover:shadow-elegant"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-widest text-navy">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p className={`mt-2 text-sm ${p.featured ? "text-background/80" : "text-ink-muted"}`}>{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold">{p.price}</span>
                  <span className={`text-sm ${p.featured ? "text-background/70" : "text-ink-muted"}`}>/ project</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-gold" : "text-brand"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${
                    p.featured
                      ? "bg-gold text-navy hover:bg-background hover:text-brand"
                      : "bg-foreground text-background hover:bg-brand"
                  }`}
                >
                  Get Started <ArrowRight className="size-4" />
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <ContactSection />
    </div>
  );
}

// ---------- Portfolio with filters ----------
function PortfolioSection() {
  const [filter, setFilter] = useState<"All" | "Web" | "Graphic">("All");
  const filtered = filter === "All" ? portfolio : portfolio.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="border-y border-border/50 bg-muted/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <SectionHeading
            eyebrow="Selected Work"
            title="Recent Projects"
            subtitle="A curated selection of websites and brand systems."
            align="center"
          />
        </FadeUp>

        <div className="mt-10 flex justify-center gap-2">
          {(["All", "Web", "Graphic"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === c
                  ? "bg-gradient-to-r from-brand to-gold text-background shadow-glow"
                  : "glass text-foreground hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.05} className={i % 5 === 0 ? "md:row-span-2 md:h-[584px]" : ""}>
              <Tilt className="group relative h-full w-full overflow-hidden rounded-3xl shadow-elegant">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold">{p.category}</p>
                  <h3 className="font-display mt-1 text-xl font-bold">{p.title}</h3>
                </div>
                <div className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-gold text-navy opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="size-4" />
                </div>
              </Tilt>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Testimonials carousel ----------
function TestimonialCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-navy py-24 text-background md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.4 }} />
      <Particles />
      <div className="relative mx-auto max-w-4xl px-6">
        <FadeUp>
          <div className="text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">Testimonials</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">What Clients Say</h2>
          </div>
        </FadeUp>

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <div className="glass-strong relative rounded-3xl p-10 md:p-14">
            <div className="mb-6 flex justify-center gap-1">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="size-5 fill-gold text-gold" />
              ))}
            </div>
            <p className="font-display text-center text-2xl leading-relaxed md:text-3xl">"{t.quote}"</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand to-gold font-bold text-navy">
                {t.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-bold">{t.name}</p>
                <p className="text-xs uppercase tracking-widest text-background/60">{t.title}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Show testimonial ${k + 1}`}
              className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-2 bg-background/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function ContactSection() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <FadeUp>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something Premium"
          subtitle="Tell me about your project — I usually reply within a few hours."
          align="center"
        />
      </FadeUp>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <FadeUp>
          <div className="glass h-full rounded-3xl p-8">
            <h3 className="font-display text-2xl font-bold">Contact Info</h3>
            <div className="mt-8 space-y-5">
              <a href="mailto:jayshumanrao2010@gmail.com" className="flex items-center gap-4 text-sm hover:text-gold">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <Mail className="size-5" />
                </span>
                jayshumanrao2010@gmail.com
              </a>
              <a href="tel:+919999999999" className="flex items-center gap-4 text-sm hover:text-gold">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <Phone className="size-5" />
                </span>
                +91 99999 99999
              </a>
              <div className="flex items-center gap-4 text-sm">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <MapPin className="size-5" />
                </span>
                Azamgarh, India
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/jayshuman_rao/" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social link"
                  className="grid size-11 place-items-center rounded-2xl glass transition-all hover:bg-gradient-to-br hover:from-brand hover:to-gold hover:text-background"
                >
                  <s.icon className="size-5" />
                </a>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Location map"
                src="https://maps.google.com/maps?q=Azamgarh&z=11&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 grayscale"
              />
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
            className="glass rounded-3xl p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your Name" name="name" />
              <Field label="Email" name="email" type="email" />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-ink-muted">Message</label>
              <textarea
                required
                rows={5}
                className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-gold px-7 py-4 text-sm font-bold text-background shadow-glow transition-transform hover:scale-[1.01]"
            >
              {sent ? "Message Sent ✓" : "Send Message"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
