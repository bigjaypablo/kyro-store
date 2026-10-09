import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease } from "../../lib/motion";
import { pic, type Slot } from "../../data/images";

type Props = {
  slot: Slot;
  bg: string;
  className?: string;
  delay?: number;
  w?: number;
};

export default function ParallaxImage({
  slot,
  bg,
  className = "",
  delay = 0,
  w = 1000,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const src = pic(slot, w);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(14% 14% 14% 14%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease, delay }}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bg }}
    >
      <motion.div style={{ y }} className="absolute -inset-[10%]">
        {src ? (
          <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(60%_55%_at_50%_35%,rgba(255,255,255,0.3),transparent)]" />
        )}
      </motion.div>
    </motion.div>
  );
}
