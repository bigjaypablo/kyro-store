import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";
import ProductGallery from "../components/ui/ProductGallery";
import NotFound from "./NotFound";
import { catalog } from "../data/catalog";
import { gallery } from "../data/gallery";
import { pic } from "../data/images";
import { useCart } from "../context/CartContext";
import { fadeUp, img, stagger } from "../lib/motion";

const sizes = ["S", "M", "L", "XL"];

const info = [
  {
    t: "Details",
    d: "Soft, breathable fabric with a clean, relaxed fit. True to size. Machine wash cold and dry flat.",
  },
  {
    t: "Delivery",
    d: "Free delivery on orders over $50. Standard delivery takes 3 to 5 working days. Express takes 1 to 2.",
  },
  {
    t: "Returns",
    d: "Return unworn items with tags within 14 days for a full refund.",
  },
];

export default function Product() {
  const { id } = useParams();
  const item = catalog.find((i) => i.id === id);
  const [size, setSize] = useState("");
  const [ci, setCi] = useState(0);
  const [shake, setShake] = useState(0);
  const { add } = useCart();

  useEffect(() => {
    setSize("");
    setShake(0);
    setCi(0);
  }, [id]);

  if (!item) return <NotFound />;

  const colors = gallery[item.id] ?? [];
  const color = colors[ci] ?? colors[0];
  const images =
    color && color.ids.length
      ? color.ids.map((p) => img(p, 1000))
      : [pic(item.slot, 1000)];

  const related = catalog.filter((i) => i.id !== item.id).slice(0, 4);

  const addToBag = () => {
    if (!size) {
      setShake((s) => s + 1);
      return;
    }
    add(item.id, color ? `${size} · ${color.name}` : size);
  };

  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-16 pt-8 text-ink md:px-6 md:pb-24 md:pt-10">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs text-ink/50">
              <Link to="/shop" className="hover:text-ink">
                Shop
              </Link>{" "}
              / {item.name}
            </p>

            <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
              <Reveal>
                <ProductGallery key={item.id + ci} images={images} name={item.name} />
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-[9vw] font-light uppercase leading-[1] tracking-tight md:text-[3vw]">
                  {item.name}
                </h1>
                <p className="mt-3 text-2xl">${item.price.toFixed(2)}</p>
                <p className="mt-1 text-xs text-ink/50">Rated 4.9 by 1,200+ buyers</p>
                <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                  {item.note}. Made to be worn every day and easy to look after.
                </p>

                {colors.length > 1 && (
                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
                      Colour: <span className="text-ink">{color?.name}</span>
                    </p>
                    <div className="mt-3 flex gap-3">
                      {colors.map((c, n) => (
                        <button
                          key={c.name}
                          aria-label={c.name}
                          onClick={() => setCi(n)}
                          className={`h-10 w-10 rounded-full border-2 p-0.5 transition-colors ${
                            ci === n ? "border-ink" : "border-transparent"
                          }`}
                        >
                          <span
                            className="block h-full w-full rounded-full border border-ink/15"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {colors.length === 1 && (
                  <p className="mt-8 text-xs uppercase tracking-[0.18em] text-ink/60">
                    Colour: <span className="text-ink">{colors[0].name}</span>
                  </p>
                )}

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.18em] text-ink/60">Size</p>
                    {shake > 0 && !size && (
                      <p className="text-xs text-red-600">Please choose a size</p>
                    )}
                  </div>
                  <motion.div
                    key={shake}
                    animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : undefined}
                    transition={{ duration: 0.4 }}
                    className="mt-3 flex gap-2"
                  >
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`h-12 w-14 rounded-full border text-sm transition-colors ${
                          size === s
                            ? "border-ink bg-ink text-white"
                            : "border-ink/25 hover:border-ink"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                </div>

                <button
                  onClick={addToBag}
                  className="mt-6 w-full rounded-full bg-ink py-4 text-sm font-medium text-white transition-transform active:scale-[0.98]"
                >
                  Add to bag
                </button>

                <ul className="mt-5 space-y-1.5 text-xs text-ink/60">
                  <li>Free delivery over $50</li>
                  <li>Easy 14 day returns</li>
                </ul>

                <div className="mt-8">
                  {info.map((x) => (
                    <details key={x.t} className="group border-t border-ink/10 py-4 last:border-b">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                        {x.t}
                        <span className="text-lg text-ink/50 transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-ink/65">{x.d}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-20">
              <h2 className="text-center text-[8vw] font-light uppercase leading-none tracking-tight md:text-[2.4vw]">
                You may also like
              </h2>
            </Reveal>

            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-4"
            >
              {related.map((r) => (
                <motion.div key={r.id} variants={fadeUp}>
                  <Link to={"/product/" + r.id} className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#EEF5F7]">
                      <img
                        src={pic(r.slot, 600)}
                        alt={r.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 flex justify-between gap-2 px-1 text-[13px]">
                      <span className="font-medium">{r.name}</span>
                      <span>${r.price.toFixed(2)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
