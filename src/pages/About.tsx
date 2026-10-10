import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";
import ParallaxImage from "../components/ui/ParallaxImage";

const values = [
  { t: "Simple", d: "Clean designs that go with everything. No loud logos, no fuss." },
  { t: "Fair", d: "Good quality at honest prices. What you see is what you pay." },
  { t: "Easy", d: "Fast delivery and 14 day returns, so you can buy with confidence." },
];

const stats = [
  { n: "12K+", l: "Happy customers" },
  { n: "14", l: "Day returns" },
  { n: "$50", l: "Free delivery from" },
];

export default function About() {
  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-16 pt-10 text-ink md:px-6 md:pb-24 md:pt-14">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/50">About KYRO</p>
              <h1 className="mt-4 max-w-3xl text-[10vw] font-light uppercase leading-[1] tracking-tight md:text-[4.4vw]">
                Clothes that look good and feel good
              </h1>
            </Reveal>

            <div className="mt-10 grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <ParallaxImage
                slot="style1"
                bg="#F2A33B"
                className="aspect-[4/5] rounded-sm"
              />
              <Reveal delay={0.1}>
                <p className="text-[15px] leading-relaxed text-ink/70">
                  KYRO started with a simple idea: everyday clothes should be easy to
                  buy and nice to wear. We design pieces that fit well, last long and
                  look sharp without trying too hard.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                  Every week we add new drops. Every order comes with fast delivery
                  and simple returns. That is the whole promise.
                </p>
                <Link
                  to="/shop"
                  className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white"
                >
                  Shop now
                </Link>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-white p-6">
                    <p className="text-[11px] tracking-[0.2em] text-ink/40">
                      0{i + 1}
                    </p>
                    <h3 className="mt-6 text-2xl font-light uppercase">{v.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-3 gap-4 border-t border-ink/10 pt-10 text-center">
              {stats.map((s) => (
                <Reveal key={s.l}>
                  <p className="text-[9vw] font-light leading-none md:text-5xl">{s.n}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-ink/50 md:text-xs">
                    {s.l}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
