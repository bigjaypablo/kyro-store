import type { Slot } from "./images";

export type TabKey = "street" | "festive" | "new" | "accessory" | "move";

export type Product = {
  id: string;
  name: string;
  price: number;
  note: string;
  slot: Slot;
  tags: TabKey[];
};

export const tabs: { key: TabKey; label: string }[] = [
  { key: "street", label: "Street Slick" },
  { key: "festive", label: "Festive Finery" },
  { key: "new", label: "New arrivals" },
  { key: "accessory", label: "Accessory Ace" },
  { key: "move", label: "On-The-Move Essentials" },
];

export const products: Product[] = [
  { id: "p1", name: "Printed Shirt", price: 41, note: "100% cotton", slot: "top1", tags: ["street", "festive", "move"] },
  { id: "p2", name: "Top Sleeve", price: 75, note: "Soft and stretchy", slot: "top2", tags: ["street", "move"] },
  { id: "p3", name: "Dark Print Shirt", price: 41, note: "Light and cool", slot: "top3", tags: ["street", "festive", "accessory"] },
  { id: "p4", name: "Graphic Tee", price: 32, note: "Easy everyday wear", slot: "top4", tags: ["festive", "accessory"] },
  { id: "p5", name: "Cargo Jacket", price: 96, note: "Warm with big pockets", slot: "top5", tags: ["street", "move", "accessory"] },
  { id: "p6", name: "Knit Polo", price: 58, note: "Smooth and neat", slot: "top6", tags: ["festive", "move"] },
];

export const countFor = (k: TabKey) =>
  k === "new" ? products.length : products.filter((p) => p.tags.includes(k)).length;

export type Trending = {
  id: string;
  name: string;
  sub: string;
  price: number;
  slot: Slot;
};

export const trending: Trending[] = [
  { id: "t1", name: "T-shirt", sub: "Soft cotton", price: 38, slot: "trend1" },
  { id: "t2", name: "Men's Top Sleeve", sub: "Slim fit", price: 88.95, slot: "trend2" },
  { id: "t3", name: "Women's Jogger", sub: "Loose and light", price: 58.95, slot: "trend3" },
  { id: "t4", name: "Women Top Sleeve", sub: "Easy to style", price: 45, slot: "trend4" },
  { id: "t5", name: "Black Hoodie", sub: "Warm and thick", price: 74, slot: "trend5" },
  { id: "t6", name: "Blazer", sub: "Sharp and clean", price: 39, slot: "trend6" },
];
