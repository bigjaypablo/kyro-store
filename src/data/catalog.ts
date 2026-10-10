import type { Slot } from "./images";
import { products, trending } from "./products";

export type Item = {
  id: string;
  name: string;
  price: number;
  note: string;
  slot: Slot;
};

export const catalog: Item[] = [
  ...products.map((p) => ({ id: p.id, name: p.name, price: p.price, note: p.note, slot: p.slot })),
  ...trending.map((t) => ({ id: t.id, name: t.name, price: t.price, note: t.sub, slot: t.slot })),
];
