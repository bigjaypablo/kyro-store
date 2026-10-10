import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";

const options = [
  { n: "Standard", t: "3 to 5 working days", p: "Free over $50, otherwise $5" },
  { n: "Express", t: "1 to 2 working days", p: "$12" },
];

const steps = [
  { t: "Tell us", d: "Email hello@kyro.store with your order number." },
  { t: "Send it back", d: "Pack the item unworn with its tags. We send you a return label." },
  { t: "Get your refund", d: "Once we receive and check your item, we refund your original payment method." },
];

const faqs = [
  { q: "Can I change my order?", a: "Email us as soon as you can. If your order has not shipped yet, we will change it for you." },
  { q: "Do you deliver to my country?", a: "We deliver to selected countries. You can see if we deliver to you at checkout." },
  { q: "How do I track my order?", a: "When your order ships, we email you a tracking link." },
  { q: "What if my item is faulty?", a: "Email us a photo and your order number. We will send a replacement or refund you." },
];

export default function Delivery() {
  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-16 pt-10 text-ink md:px-6 md:pb-24 md:pt-14">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/50">Help</p>
              <h1 className="mt-4 text-[10vw] font-light uppercase leading-[1] tracking-tight md:text-[4vw]">
                Delivery and returns
              </h1>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="text-xs uppercase tracking-[0.2em] text-ink/50">Delivery</h2>
            </Reveal>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {options.map((o, i) => (
                <Reveal key={o.n} delay={i * 0.08}>
                  <div className="rounded-2xl bg-white p-6">
                    <p className="text-2xl font-light uppercase">{o.n}</p>
                    <p className="mt-3 text-sm text-ink/65">{o.t}</p>
                    <p className="mt-1 text-sm">{o.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14">
              <h2 className="text-xs uppercase tracking-[0.2em] text-ink/50">
                Returns in 3 steps
              </h2>
              <p className="mt-2 text-sm text-ink/60">You have 14 days from the day you get your order.</p>
            </Reveal>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-white p-6">
                    <p className="text-[11px] tracking-[0.2em] text-ink/40">0{i + 1}</p>
                    <h3 className="mt-6 text-xl font-light uppercase">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14">
              <h2 className="text-xs uppercase tracking-[0.2em] text-ink/50">Questions</h2>
            </Reveal>
            <div className="mt-4">
              {faqs.map((f) => (
                <details key={f.q} className="group border-t border-ink/10 py-4 last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-lg text-ink/50 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
