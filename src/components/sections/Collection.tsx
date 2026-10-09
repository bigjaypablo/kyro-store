import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "../ui/Reveal";
import { ease } from "../../lib/motion";
import { pic } from "../../data/images";

type LookKey = "look1" | "look2" | "look3" | "look4";

function ArrowBtn({ solid = false }: { solid?: boolean }) {
  return (
    <a
      href="#shop"
      aria-label="Shop"
      className={`group flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-500 ${
        solid
          ? "border-white bg-white text-ink"
          : "border-white/40 text-white hover:bg-white hover:text-ink"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 group-hover:rotate-45"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function ImageCard({
  slot,
  bg,
  delay = 0,
}: {
  slot: LookKey;
  bg: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const src = pic(slot, 900);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease, delay }}
      className="relative aspect-[3/4] overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <motion.div style={{ y }} className="absolute -inset-[12%]">
        {src ? (
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(60%_50%_at_50%_30%,rgba(255,255,255,0.22),transparent)]" />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <section id="collection" className="bg-deep px-3 md:px-5">
      <div className="bg-ink px-4 py-14 md:px-6 md:py-20">
        {/* heading row */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-start md:justify-between">
          <Reveal>
            <h2 className="text-[11vw] font-light uppercase leading-[0.95] tracking-tight md:text-[4.2vw]">
              Creative
              <br />
              Collection
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="md:text-right">
            <p className="text-[11px] tracking-[0.2em] text-fog">/2024</p>
            <p className="mt-2 max-w-[260px] text-[11px] uppercase leading-relaxed tracking-[0.12em] text-white/80 md:ml-auto">
              Simple, timeless dresses made for the modern woman
            </p>
          </Reveal>
        </div>

        {/* checkerboard grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
          <ImageCard slot="look1" bg="#1F6B58" />

          <Reveal delay={0.1} className="relative flex min-h-[320px] flex-col justify-between p-2 md:p-4">
            <p className="text-[11px] tracking-[0.2em] text-fog">/2024</p>
            <div>
              <h3 className="text-3xl font-light uppercase leading-tight tracking-tight md:text-4xl">
                Look good,
                <br />
                feel good,
                <br />
                do good
              </h3>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-fog">
                Stylish looks
                <br />
                for every day
              </p>
            </div>
            <div className="mt-8">
              <ArrowBtn solid />
            </div>
          </Reveal>

          <ImageCard slot="look2" bg="#B84A5A" delay={0.1} />

          <Reveal delay={0.1} className="relative flex min-h-[320px] flex-col justify-between p-2 md:p-4">
            <p className="max-w-[160px] text-[11px] uppercase leading-relaxed tracking-[0.2em] text-fog">
              Hot picks
              <br />
              this season
            </p>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-fog">/2024</p>
              <h3 className="mt-3 text-3xl font-light uppercase leading-tight tracking-tight md:text-4xl">
                Get ready
                <br />
                to stand
                <br />
                out
              </h3>
            </div>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-3xl font-light md:text-4xl">
                  <CountUp to={12} suffix="K+" />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fog">
                  Women who
                  <br />
                  shop with us
                </p>
              </div>
              <ArrowBtn />
            </div>
          </Reveal>

          <ImageCard slot="look3" bg="#7F9BC8" delay={0.05} />
          <ImageCard slot="look4" bg="#E9A99A" delay={0.15} />
        </div>
      </div>
    </section>
  );
}
