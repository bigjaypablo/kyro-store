import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "../../lib/motion";

const KEY = "kyro-cookie";

function Switch({
  on,
  onChange,
  disabled = false,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? "bg-lime" : "bg-white/20"
      } ${disabled ? "opacity-60" : ""}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full transition-transform ${
          on ? "translate-x-5 bg-ink" : "bg-white"
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    let t: number | undefined;
    let saved = false;
    try {
      saved = !!localStorage.getItem(KEY);
    } catch {
      saved = false;
    }
    if (!saved) t = window.setTimeout(() => setShow(true), 1200);

    const reopen = () => {
      try {
        const s = JSON.parse(localStorage.getItem(KEY) || "{}");
        setAnalytics(!!s.analytics);
        setMarketing(!!s.marketing);
      } catch {
        /* ignore */
      }
      setManage(true);
      setShow(true);
    };
    window.addEventListener("kyro:cookies", reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("kyro:cookies", reopen);
    };
  }, []);

  const save = (a: boolean, m: boolean) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ analytics: a, marketing: m }));
    } catch {
      /* ignore */
    }
    setShow(false);
    setManage(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-x-3 bottom-3 z-[80] rounded-2xl border border-white/10 bg-ink/95 p-5 text-white shadow-2xl backdrop-blur-xl md:inset-x-auto md:left-5 md:bottom-5 md:w-[420px]"
        >
          <p className="text-sm font-medium">We use cookies</p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/60">
            We use cookies to keep your bag working and to understand how people use our site.
            You choose what we can use. Read our{" "}
            <Link to="/cookies" className="underline underline-offset-4">Cookie Policy</Link>{" "}
            and <Link to="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.
          </p>

          {manage && (
            <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm">Essential</p>
                  <p className="text-xs text-white/50">Needed for your bag and basic features. Always on.</p>
                </div>
                <Switch on disabled onChange={() => {}} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm">Analytics</p>
                  <p className="text-xs text-white/50">Helps us see which pages people use.</p>
                </div>
                <Switch on={analytics} onChange={setAnalytics} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm">Marketing</p>
                  <p className="text-xs text-white/50">Lets us show you offers you may like.</p>
                </div>
                <Switch on={marketing} onChange={setMarketing} />
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {manage ? (
              <button
                onClick={() => save(analytics, marketing)}
                className="flex-1 rounded-full bg-lime px-4 py-2.5 text-sm font-medium text-ink"
              >
                Save choices
              </button>
            ) : (
              <>
                <button
                  onClick={() => save(true, true)}
                  className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink"
                >
                  Accept all
                </button>
                <button
                  onClick={() => save(false, false)}
                  className="flex-1 rounded-full border border-white/25 px-4 py-2.5 text-sm"
                >
                  Reject extras
                </button>
                <button
                  onClick={() => setManage(true)}
                  className="w-full px-2 py-1 text-xs text-white/60 underline underline-offset-4 hover:text-white"
                >
                  Choose what to allow
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
