import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Reveal from "../components/ui/Reveal";
import { catalog } from "../data/catalog";
import { pic } from "../data/images";
import { useCart } from "../context/CartContext";

const field =
  "w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm outline-none placeholder:text-ink/40 focus:border-ink";

type Ship = "standard" | "express";
type Pay = "card" | "cod";

const optBtn = (on: boolean) =>
  `flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
    on ? "border-ink bg-white" : "border-ink/20 hover:border-ink/50"
  }`;

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [ship, setShip] = useState<Ship>("standard");
  const [pay, setPay] = useState<Pay>("card");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [codeMsg, setCodeMsg] = useState("");
  const [placed, setPlaced] = useState<{ no: string; email: string } | null>(null);

  const discount = applied ? subtotal * 0.1 : 0;
  const shipCost = ship === "express" ? 12 : subtotal >= 50 ? 0 : 5;
  const total = Math.max(0, subtotal - discount + shipCost);

  const applyCode = () => {
    if (code.trim().toUpperCase() === "KYRO10") {
      setApplied(true);
      setCodeMsg("10% off applied.");
    } else {
      setApplied(false);
      setCodeMsg("That code is not valid.");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const no = "KY-" + Math.floor(100000 + Math.random() * 900000);
    setPlaced({ no, email });
    clear();
    window.scrollTo(0, 0);
  };

  if (placed) {
    return (
      <PageShell>
        <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
          <div className="bg-mist px-4 py-20 text-center text-ink md:px-6 md:py-28">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.25em] text-ink/50">Thank you</p>
              <h1 className="mt-4 text-[11vw] font-light uppercase leading-none tracking-tight md:text-[4vw]">
                Order placed
              </h1>
              <p className="mx-auto mt-6 max-w-sm text-sm text-ink/70">
                Your order number is <span className="font-medium">{placed.no}</span>. We sent a
                confirmation to {placed.email || "your email"}.
              </p>
              <p className="mt-1 text-xs text-ink/50">Demo mode: no real order was made.</p>
              <Link
                to="/shop"
                className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white"
              >
                Continue shopping
              </Link>
            </Reveal>
          </div>
        </section>
      </PageShell>
    );
  }

  if (lines.length === 0) {
    return (
      <PageShell>
        <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
          <div className="bg-mist px-4 py-24 text-center text-ink md:px-6">
            <h1 className="text-[10vw] font-light uppercase leading-none tracking-tight md:text-[3.4vw]">
              Your bag is empty
            </h1>
            <p className="mt-4 text-sm text-ink/60">Add something and come back to check out.</p>
            <Link
              to="/shop"
              className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white"
            >
              Start shopping
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="bg-deep px-3 pb-3 md:px-5 md:pb-5">
        <div className="bg-mist px-4 pb-16 pt-10 text-ink md:px-6 md:pb-24 md:pt-14">
          <Reveal>
            <h1 className="text-center text-[11vw] font-light uppercase leading-none tracking-tight md:text-[3.4vw]">
              Checkout
            </h1>
          </Reveal>

          <form
            onSubmit={submit}
            className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-[1fr_380px] md:gap-12"
          >
            <div className="space-y-10">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ink/60">1. Contact</p>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={field}
                />
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ink/60">2. Delivery</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required placeholder="Full name" className={field} />
                  <input required type="tel" placeholder="Phone" className={field} />
                  <input required placeholder="Address" className={`${field} sm:col-span-2`} />
                  <input required placeholder="City" className={field} />
                  <input required placeholder="State or region" className={field} />
                  <input required placeholder="Country" className={`${field} sm:col-span-2`} />
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ink/60">
                  3. Delivery method
                </p>
                <div className="space-y-2">
                  <button type="button" onClick={() => setShip("standard")} className={optBtn(ship === "standard")}>
                    <span>
                      Standard
                      <span className="block text-xs text-ink/50">3 to 5 working days</span>
                    </span>
                    <span>{subtotal >= 50 ? "Free" : "$5.00"}</span>
                  </button>
                  <button type="button" onClick={() => setShip("express")} className={optBtn(ship === "express")}>
                    <span>
                      Express
                      <span className="block text-xs text-ink/50">1 to 2 working days</span>
                    </span>
                    <span>$12.00</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ink/60">4. Payment</p>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setPay("card")} className={optBtn(pay === "card")}>
                    Card
                  </button>
                  <button type="button" onClick={() => setPay("cod")} className={optBtn(pay === "cod")}>
                    Pay on delivery
                  </button>
                </div>
                <div className="mt-3 rounded-xl border border-dashed border-ink/25 p-4 text-sm text-ink/60">
                  {pay === "card"
                    ? "Secure card payment (Stripe or Paystack) appears here in the live store. This demo does not take card details."
                    : "Pay in cash or by transfer when your order arrives."}
                </div>
              </div>

              <label className="flex items-start gap-3 text-xs text-ink/60">
                <input required type="checkbox" className="mt-0.5" />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="underline underline-offset-2">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-ink py-4 text-sm font-medium text-white md:hidden"
              >
                Place order  ${total.toFixed(2)}
              </button>
            </div>

            <aside className="h-fit rounded-2xl bg-white p-5 md:sticky md:top-6">
              <p className="text-sm font-medium">Order summary</p>
              <ul className="mt-4 space-y-4">
                {lines.map((l) => {
                  const it = catalog.find((i) => i.id === l.id);
                  if (!it) return null;
                  return (
                    <li key={l.id + l.size} className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={pic(it.slot, 200)}
                          alt=""
                          className="h-16 w-14 rounded-lg bg-[#EEF5F7] object-cover"
                        />
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-white">
                          {l.qty}
                        </span>
                      </div>
                      <div className="flex-1 text-sm">
                        <p>{it.name}</p>
                        <p className="text-xs text-ink/50">{l.size.includes("·") ? l.size : "Size " + l.size}</p>
                      </div>
                      <p className="text-sm">${(it.price * l.qty).toFixed(2)}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Discount code"
                  className="min-w-0 flex-1 rounded-full border border-ink/20 px-4 py-2.5 text-sm outline-none focus:border-ink"
                />
                <button
                  type="button"
                  onClick={applyCode}
                  className="rounded-full border border-ink px-5 text-sm hover:bg-ink hover:text-white"
                >
                  Apply
                </button>
              </div>
              {codeMsg && (
                <p className={`mt-2 text-xs ${applied ? "text-green-700" : "text-red-600"}`}>
                  {codeMsg}
                </p>
              )}

              <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink/60">Subtotal</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                {applied && (
                  <div className="flex justify-between">
                    <dt className="text-ink/60">Discount</dt>
                    <dd>-${discount.toFixed(2)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-ink/60">Delivery</dt>
                  <dd>{shipCost === 0 ? "Free" : "$" + shipCost.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium">
                  <dt>Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                className="mt-5 hidden w-full rounded-full bg-ink py-4 text-sm font-medium text-white md:block"
              >
                Place order
              </button>
            </aside>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
