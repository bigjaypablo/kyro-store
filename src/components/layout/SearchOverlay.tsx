import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { catalog } from "../../data/catalog";
import { pic } from "../../data/images";
import { ease } from "../../lib/motion";

const popular = ["Hoodie", "Blazer", "Jogger", "T-shirt"];

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const term = q.trim().toLowerCase();
  const results = term
    ? catalog.filter((i) => i.name.toLowerCase().includes(term)).slice(0, 5)
    : [];

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  const open = (id: string) => {
    onClose();
    nav("/product/" + id);
  };

  const go = (t: string) => {
    onClose();
    nav(`/shop?q=${encodeURIComponent(t)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink/95 px-5 pt-6 backdrop-blur-xl md:px-10"
      data-lenis-prevent
    >
      <div className="mx-auto max-w-2xl pb-10">
        <div className="flex items-center justify-between">
          <p className="label">Search</p>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-sm text-fog transition-colors hover:text-white"
          >
            Close
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (term) go(q.trim());
          }}
          className="mt-8 border-b border-white/30 pb-3"
        >
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search hoodies, tees, jackets"
            className="w-full bg-transparent text-2xl font-light outline-none placeholder:text-white/30 md:text-4xl"
          />
        </form>

        {results.length > 0 && (
          <ul className="mt-6 space-y-2">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => open(r.id)}
                  className="flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors hover:bg-white/5"
                >
                  <img
                    src={pic(r.slot, 200)}
                    alt=""
                    className="h-14 w-14 rounded-lg bg-[#EEF5F7] object-cover"
                  />
                  <span className="flex-1 text-sm">{r.name}</span>
                  <span className="text-sm text-fog">${r.price.toFixed(2)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {term && results.length === 0 && (
          <p className="mt-6 text-sm text-fog">Nothing found for "{q}". Try another word.</p>
        )}

        <div className="mt-10">
          <p className="label mb-3">Popular</p>
          <div className="flex flex-wrap gap-2">
            {popular.map((p) => (
              <button
                key={p}
                onClick={() => go(p)}
                className="glass rounded-full px-4 py-2 text-sm transition-colors hover:bg-white hover:text-ink"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
