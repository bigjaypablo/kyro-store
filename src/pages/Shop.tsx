import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";
import { catalog } from "../data/catalog";
import { pic } from "../data/images";
import { useCart } from "../context/CartContext";
import { fadeUp, stagger } from "../lib/motion";

const cats = ["All", "Tops", "Outerwear", "Bottoms"] as const;
type Cat = (typeof cats)[number];
type Sort = "featured" | "low" | "high";

const catOf = (name: string): Exclude<Cat, "All"> => {
  const n = name.toLowerCase();
  if (/(hoodie|jacket|blazer)/.test(n)) return "Outerwear";
  if (/jogger/.test(n)) return "Bottoms";
  return "Tops";
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();
  const [cat, setCat] = useState<Cat>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const { add } = useCart();

  const list = useMemo(() => {
    let l = catalog.filter(
      (i) =>
        (!q || i.name.toLowerCase().includes(q)) &&
        (cat === "All" || catOf(i.name) === cat)
    );
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [q, cat, sort]);

  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-16 pt-10 text-ink md:px-6 md:pb-24 md:pt-14">
          <Reveal>
            <h1 className="text-[12vw] font-light uppercase leading-none tracking-tight md:text-[4vw]">
              Shop all
            </h1>
            <p className="mt-3 text-sm text-ink/60">
              {list.length} {list.length === 1 ? "item" : "items"}
            </p>
          </Reveal>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                    cat === c
                      ? "border-ink bg-ink text-white"
                      : "border-ink/20 text-ink/70 hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {q && (
                <button
                  onClick={() => setParams({})}
                  className="rounded-full bg-ink/10 px-3 py-2 text-xs"
                >
                  "{q}" x
                </button>
              )}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-ink/20 bg-transparent px-4 py-2 text-sm outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>

          {list.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-ink/60">Nothing matches that. Try another search.</p>
              <button
                onClick={() => {
                  setParams({});
                  setCat("All");
                }}
                className="mt-5 rounded-full bg-ink px-6 py-3 text-sm text-white"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${cat}-${sort}-${q}`}
              variants={stagger(0.06)}
              initial="hidden"
              animate="show"
              className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-4"
            >
              {list.map((i) => (
                <motion.article key={i.id} variants={fadeUp} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#EEF5F7]">
                    <Link to={"/product/" + i.id} aria-label={i.name} className="absolute inset-0 z-10" />
                    <img
                      src={pic(i.slot, 700)}
                      alt={i.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2 px-1">
                    <div>
                      <h3 className="text-[13px] font-medium md:text-sm">
                        <Link to={"/product/" + i.id} className="hover:underline">{i.name}</Link>
                      </h3>
                      <p className="mt-0.5 text-[11px] text-ink/50">{i.note}</p>
                    </div>
                    <p className="text-[13px] font-medium md:text-sm">
                      ${i.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => add(i.id)}
                    className="mt-3 w-full rounded-full border border-ink/25 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-white"
                  >
                    Add to bag +
                  </button>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
