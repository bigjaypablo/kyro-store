import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

type L = { label: string; to?: string; href?: string };

const cols: { title: string; links: L[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Trending", to: "/trending" },
      { label: "Lookbook", to: "/lookbook" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Delivery and returns", to: "/delivery" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", to: "/account" },
      { label: "Create account", to: "/account" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "X", href: "#" },
    ],
  },
];

const cls = "text-sm text-white/80 transition-colors hover:text-lime";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const o = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={ref} className="bg-deep p-3 md:p-5">
      <div className="overflow-hidden bg-ink px-4 pt-14 md:px-6 md:pt-20">
        <div className="grid gap-10 md:grid-cols-6">
          <p className="max-w-[260px] text-sm text-fog md:col-span-2">
            Simple clothes that look good and feel good. New drops every week.
          </p>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="label mb-4">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link to={l.to} className={cls}>
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className={cls}>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.p
          style={{ y, opacity: o }}
          className="mt-14 select-none text-center text-[34vw] font-semibold leading-[0.8] tracking-tighter text-white/90 md:mt-20"
        >
          KYRO
        </motion.p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-1 pt-4 text-[11px] text-white/40">
        <span>© 2027 KYRO. All rights reserved.</span>
        <Link to="/privacy" className="hover:text-white">Privacy</Link>
        <Link to="/terms" className="hover:text-white">Terms</Link>
        <Link to="/cookies" className="hover:text-white">Cookies</Link>
        <button
          onClick={() => window.dispatchEvent(new Event("kyro:cookies"))}
          className="hover:text-white"
        >
          Cookie settings
        </button>
      </div>
    </footer>
  );
}
