import Avatar from "../ui/Avatar";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { fadeUp, stagger } from "../../lib/motion";

const reviews = [
  { name: "Sara Adams", text: "The fit is perfect and the cloth feels great. I wear it every week." },
  { name: "Daniel Okoye", text: "Fast delivery and easy returns. The hoodie is warm and looks even better in person." },
  { name: "Albert Banks", text: "Fair prices and real quality. I already ordered twice." },
  { name: "Joy Martins", text: "Clean designs that go with everything. I get compliments all the time." },
  { name: "Tunde Bello", text: "Sizes are true and the support team answered me in minutes." },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-ink">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const card = scroller.current?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 16 : 1;
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setActive(Math.min(reviews.length - 1, Math.round(el.scrollLeft / step())));
  };

  const goTo = (i: number) =>
    scroller.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <section id="reviews" className="bg-deep px-3 md:px-5">
      <div className="bg-mist px-4 pb-16 pt-6 text-ink md:px-6 md:pb-24">
        <Reveal>
          <h2 className="text-center text-[10vw] font-light uppercase leading-[1] tracking-tight md:text-[3.2vw]">
            What they say
            <br />
            about us
          </h2>
        </Reveal>

        <motion.div
          ref={scroller}
          onScroll={onScroll}
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="no-scrollbar mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto md:mt-14"
        >
          {reviews.map((r) => (
            <motion.article
              key={r.name}
              variants={fadeUp}
              className="w-[80vw] shrink-0 snap-start rounded-xl bg-white p-5 sm:w-[340px] md:w-[calc((100%-2rem)/3)]"
            >
              <div className="flex items-center justify-between">
                <Stars />
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  Verified buyer
                </span>
              </div>
              <p className="mt-6 min-h-[84px] text-[13px] leading-relaxed text-ink/75">
                {r.text}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar name={r.name} />
                <div>
                  <p className="text-[12px] font-medium">{r.name}</p>
                  <p className="text-[10px] text-ink/50">KYRO customer</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              aria-label={`Review ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                active === i ? "w-6 bg-ink" : "w-1.5 bg-ink/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
