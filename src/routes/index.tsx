import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
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
  QrCode,
  ShieldCheck,
  Copy,
  Plus,
  Minus,
  Zap,
  Award,
  Clock,
  Smartphone,
  Lock,
  Heart,
  MessageCircle,
  Calculator,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { testimonials } from "@/lib/portfolio-data";
import { FadeUp, SectionHeading } from "@/components/section";
import founderAsset from "@/assets/jayshuman-founder-new.png";
import bannerAsset from "@/assets/jayshuman-banner.png";
import anshumanProject from "@/assets/anshuman-portfolio.png";

const SITE_URL = "https://jayshumanweb.lovable.app";
const SOCIAL_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/8fMRJ9WW88V1A03BiIIrKk3AyLn2/social-images/social-1781087267096-73dbc954-dd6a-4d9b-bb41-d982866d25ae.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jayshuman Rao — Premium Web Development & Graphic Design Studio" },
      { name: "description", content: "Premium websites and graphic designs that grow your business. Freelance web developer and graphic designer building luxurious, conversion-focused brands." },
      { property: "og:title", content: "Jayshuman Rao — Premium Web & Graphic Design" },
      { property: "og:description", content: "Premium websites and graphic designs that grow your business." },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:image", content: SOCIAL_IMAGE },
      { property: "og:image:alt", content: "Jayshuman Rao — Web Developer & Graphic Designer" },
      { name: "twitter:title", content: "Jayshuman Rao — Premium Web & Graphic Design" },
      { name: "twitter:description", content: "Premium websites and graphic designs that grow your business." },
      { name: "twitter:image", content: SOCIAL_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Jayshuman Rao — Web Development & Design Studio",
          url: SITE_URL,
          image: SOCIAL_IMAGE,
          priceRange: "₹₹",
          areaServed: "Worldwide",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Azamgarh",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
          telephone: "+91-9984482873",
          serviceType: [
            "Web Development",
            "Landing Page Design",
            "Portfolio Websites",
            "UI/UX Design",
            "SEO Optimization",
            "Brand Identity Design",
          ],
        }),
      },
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

// ---------- Typewriter ----------
function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 40 : 90;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, txt.length + 1);
        setTxt(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, txt.length - 1);
        setTxt(next);
        if (next === "") { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return (
    <span className={className}>
      {txt}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-gold align-middle" style={{ height: "1em" }} />
    </span>
  );
}

// ---------- Magnetic button ----------
function Magnetic({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
       className={`inline-flex items-center gap-2 transition-transform duration-300 will-change-transform ${className ?? ""}`}>
      {children}
    </a>
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

const processSteps = [
  { icon: Search, title: "Discovery", desc: "Deep-dive into your goals, audience, and competitors." },
  { icon: ClipboardList, title: "Planning", desc: "Strategy, sitemap, and a tight project roadmap." },
  { icon: PenTool, title: "Design", desc: "Concepts, wireframes, and pixel-perfect mockups." },
  { icon: Code2, title: "Development", desc: "Clean, scalable code with modern best practices." },
  { icon: Rocket, title: "Launch", desc: "QA, deploy, and post-launch support to keep you growing." },
];

const portfolio = [
  { id: 1, title: "Anshuman Bharti — Data Analyst Portfolio", category: "Web", img: anshumanProject, liveUrl: "https://anshumanraoweb.lovable.app/" },
  { id: 2, title: "Nova Finance App", category: "Web", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80", liveUrl: "" },
  { id: 3, title: "Aurora Skincare", category: "Graphic", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80", liveUrl: "" },
  { id: 4, title: "Helix SaaS", category: "Web", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80", liveUrl: "" },
  { id: 5, title: "Sartoria Brand", category: "Graphic", img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=900&q=80", liveUrl: "" },
  { id: 6, title: "Verve Coffee", category: "Web", img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=900&q=80", liveUrl: "" },
  { id: 7, title: "Lumen Identity", category: "Graphic", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80", liveUrl: "" },
];

const pricing = [
  {
    name: "Starter Website",
    price: "₹4,999",
    desc: "Perfect for personal portfolios, landing pages, and small businesses.",
    features: [
      "1–3 Responsive Pages",
      "Modern UI Design",
      "Contact Form",
      "WhatsApp Integration",
      "Mobile Friendly",
      "Basic SEO",
      "Fast Loading",
      "7 Days Free Support",
    ],
    cta: "Get Started",
  },
  {
    name: "Business Website",
    price: "₹9,999",
    desc: "Perfect for restaurants, gyms, clinics, coaching centers, and local businesses.",
    features: [
      "Up to 8 Pages",
      "Premium UI/UX",
      "Smooth Animations",
      "Google Maps Integration",
      "Gallery & Contact Forms",
      "Social Media Integration",
      "Basic SEO",
      "15 Days Free Support",
    ],
    cta: "Start Project",
    featured: true,
  },
  {
    name: "Premium Website",
    price: "₹19,999",
    desc: "Perfect for growing businesses and companies.",
    features: [
      "Unlimited Pages",
      "Fully Custom Design",
      "Advanced Animations",
      "Booking System",
      "CMS/Admin Dashboard",
      "Performance Optimization",
      "Advanced SEO",
      "Google Analytics Integration",
      "30 Days Priority Support",
    ],
    cta: "Contact Me",
  },
  {
    name: "E-Commerce Website",
    price: "From ₹29,999",
    desc: "Perfect for online stores that need to sell and scale.",
    features: [
      "Product Management",
      "Shopping Cart",
      "Secure Payment Gateway",
      "Order Management",
      "Customer Accounts",
      "Inventory Management",
      "Coupon System",
      "SEO Optimization",
      "Training & Support",
    ],
    cta: "Build My Store",
  },
];

const additionalServices = [
  { name: "Logo Design", price: "₹1,000–₹3,000" },
  { name: "Domain Setup", price: "₹500" },
  { name: "Hosting Setup", price: "₹500" },
  { name: "Google Business Profile", price: "₹1,000" },
  { name: "Basic SEO", price: "₹2,000" },
  { name: "Website Maintenance", price: "₹999/month" },
  { name: "Speed Optimization", price: "₹2,000" },
];

const paymentTerms = [
  "50% Advance Payment",
  "50% Before Final Delivery",
  "Free Revisions Included",
  "Domain & Hosting Charges Extra (if required)",
];

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="relative">
      <MouseGlow />

      {/* ============ HERO (4D Cinematic) ============ */}
      <HeroCinematic heroRef={heroRef} y={y} />


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
            src={bannerAsset}
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
      <section id="pricing" className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.35 }} />
        <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -z-0 size-[600px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px] animate-pulse-glow" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 -z-0 size-[500px] rounded-full bg-gold/10 blur-[140px]" />
        <Particles />

        <div className="relative mx-auto max-w-7xl px-6">
          <FadeUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">Pricing</p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                Choose the Perfect Website Package
              </h2>
              <p className="mt-4 text-base text-white/70 md:text-lg">
                Affordable, high-quality websites designed to help businesses grow online. Whether you're a startup, local business, or established company, I have a package that fits your needs.
              </p>
            </div>
          </FadeUp>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.08} className="h-full">
                <div
                  className={`group relative flex h-full flex-col rounded-3xl p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 ${
                    p.featured
                      ? "border-2 border-gold/70 bg-gradient-to-br from-brand/30 via-navy/60 to-gold/20 shadow-glow animate-pulse-glow"
                      : "border border-white/10 bg-white/5 hover:border-gold/40 hover:shadow-elegant"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-gold to-brand px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-navy shadow-gold">
                      ★ Most Popular
                    </span>
                  )}

                  <h3 className="font-display text-xl font-bold text-white">{p.name}</h3>
                  <p className="mt-2 min-h-[48px] text-xs leading-relaxed text-white/60">{p.desc}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className={`font-display text-4xl font-extrabold ${p.featured ? "text-gradient-brand" : "text-white"}`}>
                      {p.price}
                    </span>
                  </div>

                  <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <ul className="flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                        <span className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${p.featured ? "bg-gold/20 text-gold" : "bg-brand/20 text-brand"}`}>
                          <Check className="size-2.5" strokeWidth={3} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`group/btn mt-7 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-bold transition-all ${
                      p.featured
                        ? "bg-gradient-to-r from-gold to-brand text-navy shadow-gold hover:scale-[1.03]"
                        : "border border-white/20 bg-white/5 text-white hover:border-gold hover:bg-gold hover:text-navy"
                    }`}
                  >
                    {p.cta}
                    <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Additional Services */}
          <FadeUp>
            <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-brand/30 to-gold/30 text-gold">
                  <Sparkles className="size-5" />
                </span>
                <h3 className="font-display text-2xl font-bold text-white">Additional Services</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {additionalServices.map((s) => (
                  <div
                    key={s.name}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:border-gold/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand/20 text-brand transition-colors group-hover:bg-gold/20 group-hover:text-gold">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium text-white/90">{s.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gold">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Payment Info */}
          <FadeUp delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/10 via-brand/10 to-transparent p-8 backdrop-blur-xl md:p-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-gold/20 text-gold">
                  <ClipboardList className="size-5" />
                </span>
                <h3 className="font-display text-2xl font-bold text-white">Payment Information</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {paymentTerms.map((term) => (
                  <div key={term} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-brand text-navy">
                      <Check className="size-3" strokeWidth={4} />
                    </span>
                    <span className="text-sm font-medium text-white/90">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============ PAYMENT OPTIONS ============ */}
      <PaymentSection />

      {/* ============ WHY CHOOSE ME ============ */}
      <WhyChooseSection />

      {/* ============ COST CALCULATOR ============ */}
      <CostCalculator />

      {/* ============ FAQ ============ */}
      <FAQSection />

      {/* ============ CONTACT ============ */}
      <ContactSection />

      {/* Floating buttons */}
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}

// ---------- Why Choose Me ----------
const whyChoose = [
  { icon: Smartphone, title: "Responsive Design", desc: "Pixel-perfect on every device." },
  { icon: Palette, title: "Modern UI/UX", desc: "Trend-aware, brand-first design." },
  { icon: Zap, title: "Fast Delivery", desc: "Ship in days, not months." },
  { icon: Search, title: "SEO Friendly", desc: "Built to rank from day one." },
  { icon: Lock, title: "Secure Coding", desc: "Best practices, no shortcuts." },
  { icon: Award, title: "Lifetime Code Ownership", desc: "Your code is yours forever." },
  { icon: Rocket, title: "Speed Optimized", desc: "Lightning-fast load times." },
  { icon: Heart, title: "Affordable Pricing", desc: "Premium quality, honest rates." },
  { icon: MessageCircle, title: "Free Consultation", desc: "Talk before you commit." },
  { icon: Sparkles, title: "Premium Quality", desc: "Every pixel intentional." },
];

function WhyChooseSection() {
  return (
    <section id="why-me" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <FadeUp>
        <SectionHeading
          eyebrow="Why Choose Me"
          title="Ten reasons founders trust me with their brand"
          align="center"
        />
      </FadeUp>
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {whyChoose.map((w, i) => (
          <FadeUp key={w.title} delay={i * 0.04}>
            <div className="group h-full rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
              <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand/20 to-gold/20 text-brand transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <w.icon className="size-6" />
              </div>
              <h3 className="font-display mt-5 text-base font-bold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{w.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ---------- Cost Calculator ----------
const calcFeatures = [
  { key: "seo", label: "SEO Optimization", price: 2000 },
  { key: "cms", label: "Content Management", price: 3500 },
  { key: "blog", label: "Blog Section", price: 2500 },
  { key: "booking", label: "Booking / Appointment", price: 4000 },
  { key: "ecom", label: "E-Commerce Cart", price: 8000 },
  { key: "auth", label: "User Accounts / Login", price: 3500 },
  { key: "chat", label: "Live Chat / WhatsApp", price: 1000 },
  { key: "anim", label: "Advanced Animations", price: 2500 },
  { key: "multi", label: "Multi-language", price: 3000 },
  { key: "analytics", label: "Analytics Setup", price: 1500 },
];

function CostCalculator() {
  const [pages, setPages] = useState(5);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const base = 3500;
  const perPage = 800;
  const featuresTotal = calcFeatures.reduce(
    (sum, f) => sum + (selected[f.key] ? f.price : 0),
    0,
  );
  const total = base + pages * perPage + featuresTotal;

  return (
    <section id="calculator" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)", opacity: 0.25 }} />
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <SectionHeading
            eyebrow="Instant Estimate"
            title="Website Cost Calculator"
            subtitle="Get a transparent estimate in seconds. Final quote may vary based on scope."
            align="center"
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-14 grid gap-6 rounded-3xl glass-strong p-6 md:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold uppercase tracking-widest text-gold">Number of Pages</label>
                  <span className="font-display text-2xl font-extrabold text-gradient-brand">{pages}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="mt-4 w-full accent-[color:var(--color-gold)]"
                />
                <div className="mt-1 flex justify-between text-xs text-ink-muted">
                  <span>1 page</span><span>30+ pages</span>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-bold uppercase tracking-widest text-gold">Features</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {calcFeatures.map((f) => {
                    const active = !!selected[f.key];
                    return (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [f.key]: !s[f.key] }))}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all ${
                          active
                            ? "border-gold bg-gold/10 text-foreground shadow-glow"
                            : "border-border bg-background/40 text-ink-muted hover:border-gold/40 hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`grid size-5 place-items-center rounded-md border ${active ? "border-gold bg-gold text-navy" : "border-border"}`}>
                            {active && <Check className="size-3" strokeWidth={4} />}
                          </span>
                          {f.label}
                        </span>
                        <span className="font-semibold text-gold">+₹{f.price.toLocaleString("en-IN")}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-between rounded-2xl border border-gold/30 bg-gradient-to-br from-brand/15 via-navy/40 to-gold/15 p-6 md:p-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-gold/20 text-gold">
                    <Calculator className="size-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold">Estimated Cost</h3>
                </div>
                <div className="mt-6 space-y-2 text-sm text-ink-muted">
                  <div className="flex justify-between"><span>Base</span><span>₹{base.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span>{pages} × Page</span><span>₹{(pages * perPage).toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between"><span>Features</span><span>₹{featuresTotal.toLocaleString("en-IN")}</span></div>
                </div>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold">Total (approx.)</p>
                  <p className="font-display mt-2 text-5xl font-extrabold text-gradient-brand">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-gold px-6 py-3 text-sm font-bold text-background shadow-glow transition-transform hover:scale-[1.03]"
              >
                Get Exact Quote <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
const faqs = [
  { q: "How much does a website cost?", a: "Prices start at ₹4,999 for a Starter site and scale with pages and features. Use the calculator above for an instant estimate." },
  { q: "How long does delivery take?", a: "Starter sites ship in 3–5 days, Business in 7–10 days, Premium in 2–3 weeks, and E-commerce in 3–4 weeks." },
  { q: "How many revisions are included?", a: "Every package includes 2 rounds of free revisions during design. Additional rounds are billed at a small hourly rate." },
  { q: "Do you provide domain and hosting?", a: "Yes — I help you buy and set up domain, hosting, email, and SSL. Third-party costs are billed at actuals." },
  { q: "Do you offer maintenance?", a: "Yes. Monthly maintenance plans cover updates, backups, security patches, and small content edits." },
  { q: "How do payments work?", a: "50% advance to start, 50% before final delivery. UPI, Google Pay, PhonePe, and bank transfer accepted." },
  { q: "Will I own the code?", a: "Absolutely. You get lifetime ownership of your source code and full admin access." },
  { q: "Do you help after launch?", a: "Every plan includes free post-launch support (7–30 days depending on package). Extended support is available on request." },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all ${isOpen ? "border-gold/50 bg-gold/5 shadow-elegant" : "border-border bg-background/40 hover:border-gold/30"}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-bold md:text-lg">{q}</span>
        <span className={`grid size-8 shrink-0 place-items-center rounded-full transition-all ${isOpen ? "bg-gold text-navy rotate-180" : "bg-brand/10 text-brand"}`}>
          {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0">
          <p className="px-6 pb-6 text-sm leading-relaxed text-ink-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <FadeUp>
        <SectionHeading
          eyebrow="Questions"
          title="Frequently Asked"
          subtitle="Everything you need to know before we start."
          align="center"
        />
      </FadeUp>
      <div className="mt-14 space-y-3">
        {faqs.map((f, i) => (
          <FadeUp key={f.q} delay={i * 0.04}>
            <FAQItem q={f.q} a={f.a} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ---------- Floating WhatsApp ----------
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919984482873?text=Hi%20Jayshuman%2C%20I'd%20like%20to%20discuss%20a%20website%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 left-6 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <svg viewBox="0 0 24 24" className="relative size-7" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.94 11.94 0 0012.02 0C5.4 0 .04 5.36.04 11.98c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a11.96 11.96 0 005.82 1.48h.01c6.62 0 11.98-5.36 11.98-11.98 0-3.2-1.25-6.21-3.49-8.4zM12.03 21.3h-.01a9.3 9.3 0 01-4.74-1.3l-.34-.2-3.68.96.98-3.59-.22-.37a9.32 9.32 0 01-1.42-4.83c0-5.14 4.19-9.32 9.33-9.32 2.49 0 4.83.97 6.59 2.73a9.27 9.27 0 012.73 6.6c0 5.14-4.19 9.32-9.22 9.32zm5.4-6.98c-.3-.15-1.76-.87-2.03-.97s-.47-.15-.67.15-.77.97-.94 1.17-.35.22-.65.07c-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07s-.02-.46.13-.61c.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    </a>
  );
}

// ---------- Back to Top ----------
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand to-gold text-background shadow-glow transition-all duration-300 hover:scale-110 ${show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}
    >
      <ArrowUp className="size-5" />
    </button>
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
          {filtered.map((p, i) => {
            const CardWrapper = p.liveUrl ? "a" : "div";
            const wrapperProps = p.liveUrl
              ? { href: p.liveUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <FadeUp key={p.id} delay={i * 0.05} className={i % 5 === 0 ? "md:row-span-2 md:h-[584px]" : ""}>
                <CardWrapper
                  {...wrapperProps}
                  className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-3xl shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                >
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
                  {!p.liveUrl && (
                    <div className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                      Coming Soon
                    </div>
                  )}
                  <div className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-gold text-navy opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </CardWrapper>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Testimonials carousel ----------
function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section
      id="testimonials"
      className="relative overflow-hidden bg-navy py-16 text-white sm:py-20 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.4 }} />
      <Particles />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <FadeUp>
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gold sm:mb-4">Testimonials</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">What Clients Say</h2>
          </div>
        </FadeUp>

        <div className="relative mt-8 sm:mt-12 md:mt-16" ref={containerRef}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={i}
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
              className="cursor-grab active:cursor-grabbing"
            >
              <div className="glass-strong relative rounded-2xl p-6 sm:rounded-3xl sm:p-10 md:p-14">
                <div className="mb-4 flex justify-center gap-1 sm:mb-6">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="size-4 fill-gold text-gold sm:size-5" />
                  ))}
                </div>
                <p className="font-display text-center text-lg leading-relaxed sm:text-xl md:text-2xl md:leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="size-10 rounded-full object-cover ring-2 ring-gold/30 sm:size-12" />
                  ) : (
                    <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand to-gold font-bold text-navy sm:size-12">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm font-bold sm:text-base">{t.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 sm:text-xs">{t.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-md transition-all hover:bg-white/20 sm:-left-4 md:flex md:p-2.5"
          >
            <ChevronLeft className="size-5 text-white" />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-md transition-all hover:bg-white/20 sm:-right-4 md:flex md:p-2.5"
          >
            <ChevronRight className="size-5 text-white" />
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
              className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"}`}
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
              <a href="tel:+919984482873" className="flex items-center gap-4 text-sm hover:text-gold">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand/15 text-brand">
                  <Phone className="size-5" />
                </span>
                +91 99844 82873
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

function PaymentSection() {
  const [copied, setCopied] = useState(false);
  const upiId = "9984482873@upi";

  const copyUpi = async () => {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = upiId;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    };
    try {
      await navigator.clipboard.writeText(upiId);
    } catch {
      fallback();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const paymentMethods = [
    {
      name: "Google Pay",
      desc: "Fast, secure payments directly from your Google Pay app.",
      icon: GPayIcon,
      color: "from-blue-500/20 to-green-500/20",
      iconColor: "text-blue-400",
      btn: "Pay with Google Pay",
      href: `tez://upi/pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Jayshuman Rao")}&cu=INR`,
    },
    {
      name: "PhonePe",
      desc: "Pay instantly through the PhonePe UPI app on your phone.",
      icon: PhonePeIcon,
      color: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-400",
      btn: "Pay with PhonePe",
      href: `phonepe://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent("Jayshuman Rao")}&cu=INR`,
    },
    {
      name: "UPI Payment",
      desc: "Copy the UPI ID and complete payment using any UPI app.",
      icon: QrCode,
      color: "from-gold/20 to-brand/20",
      iconColor: "text-gold",
      upi: true,
    },
  ];

  return (
    <section id="payment" className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)", opacity: 0.35 }} />
      <div aria-hidden className="pointer-events-none absolute -top-32 right-0 -z-0 size-[500px] rounded-full bg-brand/20 blur-[140px] animate-pulse-glow" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 -z-0 size-[500px] rounded-full bg-gold/10 blur-[140px]" />
      <Particles />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/15 px-4 py-1.5 text-sm font-semibold text-green-300">
              <ShieldCheck className="size-4" />
              Secure Payment
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">Payment Options</p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">Secure & Easy Payment</h2>
            <p className="mt-4 text-base text-white/70 md:text-lg">
              Choose your preferred payment method to pay securely.
            </p>
          </div>
        </FadeUp>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((m, i) => {
            const Icon = m.icon;
            return (
              <FadeUp key={m.name} delay={i * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-glow">
                  <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br from-brand to-gold opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
                  <div className="relative">
                    <div className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${m.color} ${m.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon className="size-7" />
                    </div>
                    <h3 className="font-display mt-6 text-xl font-bold text-white">{m.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{m.desc}</p>

                    {m.upi ? (
                      <div className="mt-6">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">UPI ID</p>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <span className="font-mono text-base font-bold tracking-wide text-white">{upiId}</span>
                            <button
                              onClick={copyUpi}
                              aria-label="Copy UPI ID"
                              className="grid size-9 shrink-0 place-items-center rounded-xl bg-gold/20 text-gold transition-all hover:bg-gold hover:text-navy"
                            >
                              <Copy className="size-4" />
                            </button>
                          </div>
                        </div>
                        {copied && (
                          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-300">
                            <Check className="size-4" />
                            UPI ID copied successfully!
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={m.href}
                        className="group/btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-brand px-5 py-3 text-sm font-bold text-navy shadow-gold transition-all hover:scale-[1.03]"
                      >
                        {m.btn}
                        <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GPayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="gpayGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4285F4" />
          <stop offset="1" stopColor="#34A853" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#gpayGradient)" strokeWidth="2" />
      <path d="M12 7v5.5l3.5 2" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12.5l-3.5 2" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhonePeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="phonePeGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5F259F" />
          <stop offset="1" stopColor="#673AB8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="url(#phonePeGradient)" strokeWidth="2" />
      <path d="M9 8h3.5c1.5 0 2.5 1 2.5 2.5S14 13 12.5 13H11v4" stroke="url(#phonePeGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
