import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "../../lib/motion";

const links = [
  { label: "Collection", href: "#collection" },
  { label: "Shop", href: "#shop" },
  { label: "Trending", href: "#trending" },
  { label: "Reviews", href: "#reviews" },
  { label: "Lookbook", href: "#lookbook" },
];

const icon = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute inset-x-0 top-0 z-30 px-5 pt-5 md:px-8 md:pt-6">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="relative flex items-center justify-between"
      >
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink"
        >
          <svg {...icon}>
            <path d="M4 9h16M4 15h10" />
          </svg>
        </button>

        <a
          href="#"
          className="absolute left-1/2 -translate-x-1/2 text-lg font-light tracking-[0.18em]"
        >
          KYRO
        </a>

        <div className="flex items-center gap-4 text-white">
          <button aria-label="Search" className="transition-opacity hover:opacity-60">
            <svg {...icon}>
              <circle cx="11" cy="11" r="6" />
              <path d="M20 20l-4.2-4.2" />
            </svg>
          </button>
          <button aria-label="Account" className="transition-opacity hover:opacity-60">
            <svg {...icon}>
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5" />
            </svg>
          </button>
          <button aria-label="Bag" className="transition-opacity hover:opacity-60">
            <svg {...icon}>
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="glass mt-3 w-56 rounded-2xl p-2"
          >
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
