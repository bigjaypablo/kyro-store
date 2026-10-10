import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "../../lib/motion";
import { useCart } from "../../context/CartContext";
import SearchOverlay from "./SearchOverlay";

type L = { label: string; to?: string; href?: string };

const links: L[] = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Trending", to: "/trending" },
  { label: "Reviews", to: "/reviews" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
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
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const { count, setOpen } = useCart();

  const itemCls =
    "block rounded-xl px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white";

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
          onClick={() => setMenu((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-ink"
        >
          <svg {...icon}>
            <path d="M4 9h16M4 15h10" />
          </svg>
        </button>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-lg font-light tracking-[0.18em]"
        >
          KYRO
        </Link>

        <div className="flex items-center gap-4 text-white">
          <button
            aria-label="Search"
            onClick={() => setSearch(true)}
            className="transition-opacity hover:opacity-60"
          >
            <svg {...icon}>
              <circle cx="11" cy="11" r="6" />
              <path d="M20 20l-4.2-4.2" />
            </svg>
          </button>
          <Link
            to="/account"
            aria-label="Account"
            className="transition-opacity hover:opacity-60"
          >
            <svg {...icon}>
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c1-4 4-5.5 7-5.5s6 1.5 7 5.5" />
            </svg>
          </Link>
          <button
            aria-label="Bag"
            onClick={() => setOpen(true)}
            className="relative transition-opacity hover:opacity-60"
          >
            <svg {...icon}>
              <path d="M3 4h2.2l2.2 11h10.4l2-8H6" />
              <circle cx="9.5" cy="19.5" r="1.2" />
              <circle cx="17" cy="19.5" r="1.2" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-lime px-1 text-[9px] font-medium text-ink">
                {count}
              </span>
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menu && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="mt-3 w-56 rounded-2xl border border-white/10 bg-ink/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {links.map((l) => (
              <li key={l.label}>
                {l.to ? (
                  <Link to={l.to} onClick={() => setMenu(false)} className={itemCls}>
                    {l.label}
                  </Link>
                ) : (
                  <a href={l.href} onClick={() => setMenu(false)} className={itemCls}>
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {search && <SearchOverlay onClose={() => setSearch(false)} />}
      </AnimatePresence>
    </div>
  );
}
