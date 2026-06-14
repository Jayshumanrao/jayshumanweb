import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Jayshuman Rao" },
      { name: "description", content: "Sign in or create an account to access Jayshuman Rao's studio." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/" });
  }, [user, loading, navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created! You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message || "Google sign-in failed");
        setBusy(false);
        return;
      }
      if (result.redirected) return;
      toast.success("Signed in with Google");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05010f] text-white">
      {/* 3D animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.35),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.2),transparent_55%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <motion.div
          className="absolute -left-32 top-10 size-[420px] rounded-full bg-fuchsia-500/30 blur-[140px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 bottom-10 size-[480px] rounded-full bg-indigo-500/30 blur-[140px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: -8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ transformPerspective: 1000 }}
          className="w-full max-w-md"
        >
          {/* Glowing icon */}
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 shadow-[0_0_60px_rgba(168,85,247,0.6),0_0_120px_rgba(168,85,247,0.35)]"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-400/40 to-indigo-400/40 blur-xl" />
              <Sparkles className="relative size-9 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)] backdrop-blur-2xl">
            <div className="mb-6 text-center">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                {mode === "signup" ? "Create your account" : "Welcome back"}
              </h1>
              <p className="mt-2 text-sm text-white/60">
                {mode === "signup"
                  ? "Join the studio and start your creative journey."
                  : "Sign in to continue to Jayshuman Rao."}
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
              <div className="h-px flex-1 bg-white/10" /> or {mode === "signup" ? "sign up" : "sign in"} with email <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleEmail} className="space-y-3">
              {mode === "signup" && (
                <Field icon={<UserIcon className="size-4" />}>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </Field>
              )}
              <Field icon={<Mail className="size-4" />}>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </Field>
              <Field icon={<Lock className="size-4" />}>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </Field>

              <button
                type="submit"
                disabled={busy}
                className="relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(168,85,247,0.8)] transition hover:brightness-110 disabled:opacity-60"
              >
                {busy && <Loader2 className="size-4 animate-spin" />}
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/60">
              {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "signup" ? "login" : "signup")}
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                {mode === "signup" ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition focus-within:border-fuchsia-400/60 focus-within:bg-white/[0.07]">
      <span className="text-white/50">{icon}</span>
      {children}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
