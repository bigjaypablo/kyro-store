import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cols = [
  { title: "Shop", links: ["New arrivals", "Trending", "Collection", "Sale"] },
  { title: "Help", links: ["Delivery", "Returns", "Size guide", "Contact"] },
  { title: "Follow", links: ["Instagram", "TikTok", "X", "Pinterest"] },
];

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
        <div className="grid gap-10 md:grid-cols-5">
          <p className="max-w-[260px] text-sm text-fog md:col-span-2">
            Simple clothes that look good and feel good. New drops every week.
          </p>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="label mb-4">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/80 transition-colors hover:text-lime">
                      {l}
                    </a>
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
      <p className="px-1 pt-4 text-center text-[11px] text-white/40">
        © 2027 KYRO. All rights reserved.
      </p>
    </footer>
  );
}
