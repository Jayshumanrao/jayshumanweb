import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MessageCircle, Linkedin, Instagram, MapPin, Check } from "lucide-react";
import { FadeUp, SectionHeading } from "@/components/section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a Project" },
      { name: "description", content: "Get in touch to start a project. Available for select freelance engagements in branding, packaging, and digital product design." },
      { property: "og:title", content: "Contact — Start a Project" },
      { property: "og:description", content: "Get in touch to start a project." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().min(1, "Pick one"),
  budget: z.string().min(1, "Pick one"),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

const faqs = [
  { q: "What is your typical project timeline?", a: "Most identity engagements run 3–6 weeks from kickoff to handoff. Larger systems take 8–12 weeks." },
  { q: "Do you work with early-stage startups?", a: "Yes — I love working with founders pre-launch and offer a focused brand sprint for early-stage teams." },
  { q: "What's included in your final deliverables?", a: "Vector source files, exports in every format, a brand book, and 30 days of post-handoff support." },
  { q: "Do you take on retainer work?", a: "Selectively. I work with 2–3 retainer clients per quarter on ongoing creative direction." },
];

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-36 pb-24 md:pt-44">
      <FadeUp>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">Contact</p>
        <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
          Let's build something <span className="italic text-brand">considered</span>.
        </h1>
      </FadeUp>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        {/* FORM */}
        <FadeUp>
          {sent ? (
            <div className="rounded-3xl border border-brand/30 bg-brand-soft p-10 text-center">
              <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-brand text-background">
                <Check className="size-6" />
              </div>
              <h2 className="font-display text-2xl font-bold">Message sent</h2>
              <p className="mt-3 text-ink-muted">Thanks — I'll be in touch within two business days.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 md:p-10" noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="name" error={errors.name} />
                <Field label="Email" name="email" type="email" error={errors.email} />
                <Field label="Phone (optional)" name="phone" type="tel" error={errors.phone} />
                <Select label="Project type" name="projectType" error={errors.projectType}
                  options={["Branding", "Packaging", "UI / UX", "Social", "Motion", "Other"]} />
                <Select label="Budget" name="budget" error={errors.budget}
                  options={["< $5k", "$5k – $15k", "$15k – $40k", "$40k+"]} />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-ink-muted">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={2000}
                  className="w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:border-foreground"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-foreground px-8 py-4 text-sm font-bold text-background transition-transform hover:scale-[1.02]"
              >
                Send message
              </button>
            </form>
          )}
        </FadeUp>

        {/* INFO */}
        <FadeUp delay={0.1}>
          <div className="space-y-4">
            {[
              { Icon: Mail, label: "Email", value: "hello@creativepro.design", href: "mailto:hello@creativepro.design" },
              { Icon: MessageCircle, label: "WhatsApp", value: "+44 7700 900123", href: "https://wa.me/447700900123" },
              { Icon: Linkedin, label: "LinkedIn", value: "@elaravance", href: "#" },
              { Icon: Instagram, label: "Instagram", value: "@elara.designs", href: "#" },
              { Icon: MapPin, label: "Studio", value: "Shoreditch, London", href: "#" },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">{label}</p>
                  <p className="truncate font-semibold">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* FAQ */}
      <section className="mt-32">
        <FadeUp>
          <SectionHeading eyebrow="FAQ" title="Common questions" />
        </FadeUp>
        <div className="mt-12 grid gap-4">
          {faqs.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.05}>
              <details className="group rounded-3xl border border-border bg-card p-6 transition-all open:shadow-elegant">
                <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-bold">
                  {f.q}
                  <span className="ml-4 text-2xl text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-ink-muted">{f.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-ink-muted">{label}</label>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:border-foreground"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Select({ label, name, options, error }: { label: string; name: string; options: string[]; error?: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-ink-muted">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:border-foreground"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
