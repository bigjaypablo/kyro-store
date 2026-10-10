import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { catalog } from "../data/catalog";

export type CartLine = { id: string; size: string; qty: number };

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, size?: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "kyro-cart";

const load = (): CartLine[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = (id: string, size = "M") => {
    setLines((prev) => {
      const hit = prev.find((l) => l.id === id && l.size === size);
      if (hit) return prev.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, size, qty: 1 }];
    });
    setOpen(true);
  };

  const setQty = (id: string, size: string, qty: number) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.id === id && l.size === size))
        : prev.map((l) => (l.id === id && l.size === size ? { ...l, qty } : l))
    );

  const remove = (id: string, size: string) =>
    setLines((prev) => prev.filter((l) => !(l.id === id && l.size === size)));

  const clear = () => setLines([]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce(
    (s, l) => s + l.qty * (catalog.find((i) => i.id === l.id)?.price ?? 0),
    0
  );

  return (
    <CartCtx.Provider
      value={{ lines, count, subtotal, open, setOpen, add, setQty, remove, clear }}
    >
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
