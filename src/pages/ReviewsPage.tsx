import Avatar from "../components/ui/Avatar";
import { motion } from "framer-motion";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";
import { allReviews } from "../data/reviews";
import { ease, fadeUp, stagger } from "../lib/motion";

const bars = [
  { s: 5, p: 86 },
  { s: 4, p: 10 },
  { s: 3, p: 3 },
  { s: 2, p: 1 },
  { s: 1, p: 0 },
];

function Stars({ n = 5, size = 12 }: { n?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={i < n ? "text-ink" : "text-ink/20"}
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-16 pt-10 text-ink md:px-6 md:pb-24 md:pt-14">
          <Reveal>
            <h1 className="text-center text-[10vw] font-light uppercase leading-[1] tracking-tight md:text-[3.4vw]">
              What they say
              <br />
              about us
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 rounded-2xl bg-white p-6 md:grid-cols-[220px_1fr] md:p-8">
              <div>
                <p className="text-6xl font-light">4.9</p>
                <div className="mt-2">
                  <Stars size={16} />
                </div>
                <p className="mt-2 text-xs text-ink/60">Based on 1,200+ reviews</p>
              </div>
              <div className="space-y-2.5">
                {bars.map((b) => (
                  <div key={b.s} className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-ink/60">{b.s} star</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${b.p}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease }}
                        className="h-full bg-ink"
                      />
                    </div>
                    <span className="w-9 text-right text-ink/60">{b.p}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3"
          >
            {allReviews.map((r) => (
              <motion.article
                key={r.name}
                variants={fadeUp}
                className="rounded-xl bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <Stars n={r.rating} />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
                    Verified buyer
                  </span>
                </div>
                <p className="mt-5 min-h-[72px] text-[13px] leading-relaxed text-ink/75">
                  {r.text}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar name={r.name} />
                  <div>
                    <p className="text-[12px] font-medium">{r.name}</p>
                    <p className="text-[10px] text-ink/50">Bought: {r.item}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
