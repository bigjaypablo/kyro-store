import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "../../lib/motion";

const SEEN = "kyro-lead";
const CODE = "KYRO10";

export default function LeadMagnet() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/shop") return;
    try {
      if (localStorage.getItem(SEEN)) return;
    } catch {
      /* ignore */
    }
    const start = Date.now();
    let shown = false;

    const show = () => {
      if (shown) return;
      let decided = false;
      try {
        decided = !!localStorage.getItem("kyro-cookie");
      } catch {
        decided = true;
      }
      if (!decided) return;
      shown = true;
      setOpen(true);
    };

    const timer = window.setInterval(() => {
      if (Date.now() - start > 9000) show();
    }, 1000);
    const leave = (e: MouseEvent) => {
      if (e.clientY <= 0 && Date.now() - start > 4000) show();
    };
    document.addEventListener("mouseleave", leave);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("mouseleave", leave);
    };
  }, [pathname]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN, "1");
    } catch {
      /* ignore */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setDone(true);
    try {
      localStorage.setItem(SEEN, "1");
    } catch {
      /* ignore */
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-black/70 p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-ink text-white md:grid-cols-2"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-sm text-white md:text-white"
            >
              x
            </button>

            <div className="flex flex-col justify-between bg-lime p-8 text-ink md:min-h-[360px]">
              <p className="text-[11px] uppercase tracking-[0.25em]">KYRO club</p>
              <div>
                <p className="text-[90px] font-light leading-none tracking-tighter">10%</p>
                <p className="mt-2 text-lg">off your first order</p>
              </div>
            </div>

            <div className="p-8">
              {!done ? (
                <>
                  <h3 className="text-2xl font-light leading-tight">
                    Get 10% off your first order
                  </h3>
                  <p className="mt-3 text-sm text-white/60">
                    Join our list for new drops and early sale access. No spam. Leave any time.
                  </p>
                  <form onSubmit={submit} className="mt-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-white/30 focus:border-lime"
                    />
                    {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
                    <button
                      type="submit"
                      className="mt-3 w-full rounded-full bg-lime py-3 text-sm font-medium text-ink"
                    >
                      Get my 10% off
                    </button>
                  </form>
                  <p className="mt-4 text-[11px] leading-relaxed text-white/40">
                    By joining you agree to our{" "}
                    <Link to="/privacy" onClick={close} className="underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <button
                    onClick={close}
                    className="mt-3 text-xs text-white/50 underline underline-offset-4 hover:text-white"
                  >
                    No thanks
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-light leading-tight">You are in</h3>
                  <p className="mt-3 text-sm text-white/60">
                    Use this code at checkout for 10% off your first order.
                  </p>
                  <div className="mt-6 flex items-center justify-between rounded-xl border border-dashed border-lime/60 px-5 py-4">
                    <span className="text-xl tracking-[0.25em]">{CODE}</span>
                    <button onClick={copy} className="text-xs text-lime">
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <Link
                    to="/shop"
                    onClick={close}
                    className="mt-6 block rounded-full bg-white py-3 text-center text-sm font-medium text-ink"
                  >
                    Start shopping
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
