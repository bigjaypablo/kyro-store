import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../ui/Reveal";
import { useCart } from "../../context/CartContext";
import { pic, type Slot } from "../../data/images";
import { trending } from "../../data/products";
import { fadeUp, stagger } from "../../lib/motion";

function Tile({
  id,
  name,
  sub,
  price,
  slot,
}: {
  id: string;
  name: string;
  sub: string;
  price: number;
  slot: Slot;
}) {
  const { add } = useCart();
  const src = pic(slot, 700);

  return (
    <motion.article variants={fadeUp} className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#EEF1F2]">
        <Link to={"/product/" + id} aria-label={name} className="absolute inset-0 z-10" />
        {src ? (
          <img
            src={src}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(65%_55%_at_50%_40%,#FFFFFF,transparent)]" />
        )}

        <button
          onClick={() => add(id)}
          className="absolute inset-x-3 bottom-3 z-20 translate-y-0 rounded-full bg-ink py-2.5 text-[11px] uppercase tracking-[0.18em] text-white transition-transform duration-500 ease-out md:translate-y-[140%] md:group-hover:translate-y-0"
        >
          Add to bag +
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <div>
          <h3 className="text-[13px] font-medium md:text-sm">
            <Link to={"/product/" + id} className="hover:underline">{name}</Link>
          </h3>
          <p className="mt-0.5 text-[11px] text-ink/50">{sub}</p>
        </div>
        <p className="text-[13px] font-medium md:text-sm">${price.toFixed(2)}</p>
      </div>
    </motion.article>
  );
}

export default function Trending() {
  return (
    <section id="trending" className="bg-deep px-3 md:px-5">
      <div className="bg-mist px-4 pb-16 pt-6 text-ink md:px-6 md:pb-24">
        <Reveal>
          <h2 className="text-center text-[10vw] font-light uppercase leading-[1] tracking-tight md:text-[3.2vw]">
            Our trending
            <br />
            products
          </h2>
        </Reveal>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-3 gap-y-8 md:mt-14 md:grid-cols-3 md:gap-x-4 md:gap-y-10"
        >
          {trending.map((t) => (
            <Tile key={t.id} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
