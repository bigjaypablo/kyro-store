import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import Navbar from "../layout/Navbar";
import { ease } from "../../lib/motion";
import { pic } from "../../data/images";

const lines = ["EXCLUSIVE", "OFFERS FOR", "YOU"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const hero = pic("hero", 1600);

  return (
    <section ref={ref} className="bg-deep p-3 md:p-5">
      <div className="relative h-[calc(100svh-1.5rem)] min-h-[640px] overflow-hidden rounded-md border border-white/25 md:h-[calc(100svh-2.5rem)]">
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 bg-[#2F6E78]"
        >
          {hero ? (
            <img src={hero} alt="" className="h-full w-full object-cover object-top" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(55%_60%_at_65%_35%,rgba(255,255,255,0.18),transparent),linear-gradient(180deg,#3B8590,#215A63)]" />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <Navbar />

        <motion.div
          style={{ y: textY }}
          className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-10 md:pb-14"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mb-5 text-[11px] font-light tracking-[0.3em] text-white/70"
          >
            NEW SEASON
          </motion.p>

          <h1 className="text-[16vw] font-light leading-[0.95] tracking-tight md:text-[7.5vw]">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.4 + i * 0.12 }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.1 }}
            className="mt-8 max-w-[270px] md:absolute md:right-10 md:top-[38%] md:mt-0"
          >
            <p className="text-[13px] font-light leading-relaxed text-white/85">
              Clothes are more than something to wear. They show who you are.
            </p>
            <div className="mt-5">
              <Button href="#collection">Shop Now</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
