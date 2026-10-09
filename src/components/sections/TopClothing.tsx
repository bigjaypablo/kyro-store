import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "../ui/Reveal";
import ProductCard from "../ui/ProductCard";
import { countFor, products, tabs, type TabKey } from "../../data/products";
import { stagger } from "../../lib/motion";

export default function TopClothing() {
  const [tab, setTab] = useState<TabKey>("new");
  const scroller = useRef<HTMLDivElement>(null);

  const { scrollXProgress } = useScroll({ container: scroller });
  const smooth = useSpring(scrollXProgress, { stiffness: 140, damping: 24 });
  const bar = useTransform(smooth, [0, 1], [0.22, 1]);

  const list =
    tab === "new" ? products : products.filter((p) => p.tags.includes(tab));

  useEffect(() => {
    scroller.current?.scrollTo({ left: 0 });
  }, [tab]);

  return (
    <section id="shop" className="bg-deep px-3 md:px-5">
      <div className="bg-mist px-4 py-14 text-ink md:px-6 md:py-20">
        <Reveal>
          <h2 className="text-center text-[10vw] font-light uppercase leading-none tracking-tight md:text-[3.4vw]">
            Our top clothing
          </h2>
        </Reveal>

        {/* tabs */}
        <Reveal delay={0.1}>
          <div className="no-scrollbar mx-auto mt-8 flex max-w-5xl items-center gap-3 overflow-x-auto whitespace-nowrap px-1 md:mt-10 md:justify-center md:gap-5">
            {tabs.map((t, i) => (
              <div key={t.key} className="flex items-center gap-3 md:gap-5">
                <button
                  onClick={() => setTab(t.key)}
                  className={`relative py-1 text-sm transition-colors md:text-[15px] ${
                    tab === t.key ? "font-medium text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {t.label}
                  <sup className="ml-0.5 text-[9px] text-ink/50">({countFor(t.key)})</sup>
                  {tab === t.key && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-ink"
                    />
                  )}
                </button>
                {i < tabs.length - 1 && <span className="text-ink/30">/</span>}
              </div>
            ))}
          </div>
        </Reveal>

        {/* cards */}
        <div
          ref={scroller}
          className="no-scrollbar mx-auto mt-10 max-w-6xl snap-x snap-mandatory overflow-x-auto md:mt-12"
        >
          <motion.div
            key={tab}
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="flex gap-4"
          >
            {list.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                note={p.note}
                slot={p.slot}
              />
            ))}
          </motion.div>
        </div>

        {/* progress line */}
        <div className="relative mx-auto mt-8 h-px w-40 bg-ink/15">
          <motion.div
            style={{ scaleX: bar }}
            className="absolute inset-0 origin-left bg-ink"
          />
        </div>
      </div>
    </section>
  );
}
