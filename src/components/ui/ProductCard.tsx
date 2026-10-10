import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion";
import { pic, type Slot } from "../../data/images";

type Props = { id: string; name: string; price: number; note: string; slot: Slot };

export default function ProductCard({ id, name, price, note, slot }: Props) {
  const src = pic(slot, 700);

  return (
    <motion.article
      variants={fadeUp}
      className="group w-[78vw] shrink-0 snap-start rounded-2xl bg-white p-4 sm:w-[320px] md:w-[calc((100%-2rem)/3)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-medium text-ink">{name}</h3>
          <p className="mt-0.5 text-[11px] text-ink/50">{note}</p>
        </div>
        <p className="text-[15px] font-medium text-ink">${price.toFixed(2)}</p>
      </div>

      <Link
        to={"/product/" + id}
        className="relative mt-4 block aspect-[4/5] overflow-hidden rounded-xl bg-[#EEF5F7]"
      >
        {src ? (
          <img
            src={src}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(70%_60%_at_50%_35%,#FFFFFF,transparent),linear-gradient(180deg,#EEF5F7,#DCEBEF)]" />
        )}
      </Link>

      <Link
        to={"/product/" + id}
        className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
      >
        View item
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-500 group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </motion.article>
  );
}
