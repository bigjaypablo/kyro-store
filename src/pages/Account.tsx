import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";

const field =
  "w-full rounded-full border border-ink/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-ink/40 focus:border-ink";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.51 5.51 0 01-2.39 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.81z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0012 24z" />
    <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 014.9 12c0-.79.14-1.56.37-2.28v-3.1H1.27A12 12 0 000 12c0 1.94.46 3.77 1.27 5.38l4-3.1z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.23 0 12 0A12 12 0 001.27 6.62l4 3.1C6.22 6.86 8.87 4.75 12 4.75z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

type Provider = "Google" | "Apple";

export default function Account() {
  const [tab, setTab] = useState<"in" | "up">("in");
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState<Provider | null>(null);

  const social = (p: Provider) => {
    setBusy(p);
    window.setTimeout(() => {
      setBusy(null);
      setDone(`You are signed in with ${p}.`);
    }, 900);
  };

  const verb = tab === "in" ? "Continue with" : "Sign up with";

  const socialBtn =
    "flex w-full items-center justify-center gap-3 rounded-full border border-ink/20 bg-white py-3 text-sm font-medium transition-colors hover:border-ink disabled:opacity-60";

  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-20 pt-12 text-ink md:px-6 md:pb-28 md:pt-16">
          <div className="mx-auto max-w-md">
            <Reveal>
              <h1 className="text-center text-[10vw] font-light uppercase leading-none tracking-tight md:text-[3.2vw]">
                {tab === "in" ? "Sign in" : "Create account"}
              </h1>
            </Reveal>

            <div className="mx-auto mt-8 flex w-fit rounded-full border border-ink/15 p-1">
              {(["in", "up"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setDone("");
                  }}
                  className={`rounded-full px-5 py-2 text-sm transition-colors ${
                    tab === t ? "bg-ink text-white" : "text-ink/60"
                  }`}
                >
                  {t === "in" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            {done ? (
              <div className="mt-10 rounded-2xl bg-white p-6 text-center">
                <p className="text-sm text-ink/80">{done}</p>
                <p className="mt-1 text-xs text-ink/50">Demo mode: nothing is saved.</p>
                <Link
                  to="/shop"
                  className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => social("Google")}
                    disabled={busy !== null}
                    className={socialBtn}
                  >
                    <GoogleIcon />
                    {busy === "Google" ? "Connecting..." : `${verb} Google`}
                  </button>
                  <button
                    onClick={() => social("Apple")}
                    disabled={busy !== null}
                    className={socialBtn}
                  >
                    <AppleIcon />
                    {busy === "Apple" ? "Connecting..." : `${verb} Apple`}
                  </button>
                </div>

                <div className="my-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-ink/40">
                  <span className="h-px flex-1 bg-ink/15" />
                  or use email
                  <span className="h-px flex-1 bg-ink/15" />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDone(
                      tab === "in"
                        ? "Welcome back. You are signed in."
                        : "Thanks. Your account is ready."
                    );
                  }}
                  className="space-y-3"
                >
                  {tab === "up" && (
                    <input required placeholder="Full name" className={field} />
                  )}
                  <input required type="email" placeholder="Email" className={field} />
                  <input
                    required
                    type="password"
                    minLength={6}
                    placeholder="Password"
                    className={field}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-white"
                  >
                    {tab === "in" ? "Sign in" : "Create account"}
                  </button>
                </form>

                {tab === "up" && (
                  <p className="mt-4 text-center text-[11px] leading-relaxed text-ink/50">
                    By creating an account you agree to our{" "}
                    <Link to="/terms" className="underline underline-offset-2">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                )}

                <p className="mt-6 text-center text-sm text-ink/60">
                  In a hurry?{" "}
                  <Link to="/shop" className="text-ink underline underline-offset-4">
                    Continue as guest
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
