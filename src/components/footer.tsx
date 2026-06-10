import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Let's create something{" "}
              <span className="italic text-brand">legendary</span> together.
            </h2>
            <div className="mt-8 flex flex-wrap gap-6">
              <a
                href="mailto:hello@creativepro.design"
                className="border-b-2 border-brand pb-1 text-base font-medium transition-colors hover:text-brand"
              >
                hello@creativepro.design
              </a>
              <Link
                to="/contact"
                className="border-b-2 border-background pb-1 text-base font-medium transition-colors hover:border-brand hover:text-brand"
              >
                Schedule a call
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-background/40">
                Navigation
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><Link to="/portfolio" className="hover:text-brand">Work</Link></li>
                <li><Link to="/services" className="hover:text-brand">Services</Link></li>
                <li><Link to="/about" className="hover:text-brand">About</Link></li>
                <li><Link to="/blog" className="hover:text-brand">Journal</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-background/40">
                Socials
              </h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-brand">Dribbble</a></li>
                <li><a href="#" className="hover:text-brand">Behance</a></li>
                <li><a href="#" className="hover:text-brand">Instagram</a></li>
                <li><a href="#" className="hover:text-brand">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 text-sm text-background/50 md:flex-row">
          <p>© {new Date().getFullYear()} Creative Portfolio Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background">Privacy</a>
            <a href="#" className="hover:text-background">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
