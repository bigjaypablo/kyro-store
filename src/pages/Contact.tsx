import { useState } from "react";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";

const field =
  "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/40 focus:border-ink";

const topics = ["Order help", "Returns", "Product question", "Something else"];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-16 pt-10 text-ink md:px-6 md:pb-24 md:pt-14">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/50">/Contact</p>
              <h1 className="mt-4 text-[11vw] font-light uppercase leading-[1] tracking-tight md:text-[4.4vw]">
                We would love to
                <br />
                hear from you
              </h1>
            </Reveal>

            <div className="mt-10 grid gap-8 md:grid-cols-[320px_1fr] md:gap-12">
              <Reveal delay={0.1}>
                <div className="space-y-4">
                  {[
                    { l: "Email", v: "hello@kyro.store" },
                    { l: "Reply time", v: "Within 24 hours" },
                    { l: "Hours", v: "Mon to Sat, 9am to 6pm" },
                  ].map((x) => (
                    <div key={x.l} className="rounded-2xl bg-white p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40">{x.l}</p>
                      <p className="mt-2 text-sm">{x.v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                {sent ? (
                  <div className="rounded-2xl bg-white p-8 text-center">
                    <p className="text-xl font-light">Message sent</p>
                    <p className="mt-2 text-sm text-ink/60">
                      Thanks for writing. We will reply within 24 hours.
                    </p>
                    <p className="mt-1 text-xs text-ink/40">Demo mode: nothing was sent.</p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-5 text-sm underline underline-offset-4"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="space-y-3"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input required placeholder="Your name" className={field} />
                      <input required type="email" placeholder="Your email" className={field} />
                    </div>
                    <select className={field} defaultValue={topics[0]}>
                      {topics.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <textarea
                      required
                      rows={6}
                      placeholder="How can we help?"
                      className={field}
                    />
                    <button
                      type="submit"
                      className="w-full rounded-full bg-ink py-4 text-sm font-medium text-white"
                    >
                      Send message
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
