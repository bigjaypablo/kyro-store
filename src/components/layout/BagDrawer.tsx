import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { catalog } from "../../data/catalog";
import { pic } from "../../data/images";
import { ease } from "../../lib/motion";

const FREE_AT = 50;

export default function BagDrawer() {
  const { open, setOpen, lines, subtotal, count, setQty, remove } = useCart();
  const left = Math.max(0, FREE_AT - subtotal);
  const pct = Math.min(100, (subtotal / FREE_AT) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          key="bg"
          aria-label="Close bag"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[65] bg-black/60"
        />
      )}
      {open && (
        <motion.aside
          key="panel"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.6, ease }}
          className="fixed right-0 top-0 z-[66] flex h-full w-full max-w-md flex-col bg-ink p-5 text-white"
        >
          <div className="flex items-center justify-between">
            <p className="text-lg font-light tracking-wide">Your bag ({count})</p>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-fog transition-colors hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="mt-5">
            <p className="text-xs text-fog">
              {left > 0
                ? `Add $${left.toFixed(2)} more for free delivery`
                : "You get free delivery"}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease }}
                className="h-full bg-lime"
              />
            </div>
          </div>

          <div className="mt-6 flex-1 overflow-y-auto" data-lenis-prevent>
            {lines.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                <p className="text-fog">Your bag is empty.</p>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {lines.map((l) => {
                  const item = catalog.find((i) => i.id === l.id);
                  if (!item) return null;
                  return (
                    <li key={l.id + l.size} className="flex gap-4">
                      <img
                        src={pic(item.slot, 240)}
                        alt=""
                        className="h-24 w-20 rounded-lg bg-[#EEF5F7] object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between gap-3">
                          <div>
                            <p className="text-sm">{item.name}</p>
                            <p className="text-xs text-fog">{l.size.includes("·") ? l.size : "Size " + l.size}</p>
                          </div>
                          <p className="text-sm">${(item.price * l.qty).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-white/20 px-3 py-1 text-sm">
                            <button
                              aria-label="Less"
                              onClick={() => setQty(l.id, l.size, l.qty - 1)}
                            >
                              -
                            </button>
                            <span className="w-4 text-center">{l.qty}</span>
                            <button
                              aria-label="More"
                              onClick={() => setQty(l.id, l.size, l.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => remove(l.id, l.size)}
                            className="text-xs text-fog underline-offset-4 hover:text-white hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {lines.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-fog">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-[11px] text-fog">Taxes and delivery are shown at checkout.</p>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="mt-4 block rounded-full bg-lime py-3.5 text-center text-sm font-medium text-ink"
              >
                Checkout
              </Link>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
