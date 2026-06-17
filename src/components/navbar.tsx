import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "./theme-provider";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import jrLogo from "@/assets/jr-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home", hash: "" },
  { to: "/about", label: "About", hash: "" },
  { to: "/", label: "Services", hash: "#services" },
  { to: "/", label: "Portfolio", hash: "#portfolio" },
  { to: "/", label: "Pricing", hash: "#pricing" },
  { to: "/", label: "Testimonials", hash: "#testimonials" },
  { to: "/", label: "Contact", hash: "#contact" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth" });
  }

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2">
      <div className="glass flex items-center justify-between rounded-full px-5 py-3 shadow-elegant">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <img src={jrLogo.url} alt="JR logo" className="size-8 object-contain" />
          <span>Jayshuman<span className="text-brand">.</span>Rao</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          {user ? (
            <button
              onClick={handleSignOut}
              className="hidden items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand sm:inline-flex"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          ) : (
            <Link
              to="/auth"
              className="hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand sm:inline-flex"
            >
              Sign in
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass mt-2 rounded-3xl p-4 shadow-elegant lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background"
            >
              Hire Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
