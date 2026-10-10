import { img } from "../lib/motion";
import { picked } from "./picked";

const keys = [
  "hero",
  "look1", "look2", "look3", "look4",
  "top1", "top2", "top3", "top4", "top5", "top6",
  "style1", "style2",
  "trend1", "trend2", "trend3", "trend4", "trend5", "trend6",
  "work1", "work2",
] as const;

export type Slot = (typeof keys)[number];

// Filled automatically by tools/fetch-images.cjs. Empty slots show a silhouette.
const ids = Object.fromEntries(
  keys.map((k) => [k, picked[k] ?? ""])
) as Record<Slot, string>;

type Kind = "dress" | "tee" | "hoodie" | "jacket" | "pants" | "person";

const kinds: Record<Slot, Kind> = {
  hero: "person",
  look1: "dress", look2: "dress", look3: "dress", look4: "dress",
  top1: "tee", top2: "hoodie", top3: "tee", top4: "tee", top5: "jacket", top6: "tee",
  style1: "person", style2: "person",
  trend1: "tee", trend2: "hoodie", trend3: "pants", trend4: "tee", trend5: "hoodie", trend6: "jacket",
  work1: "person", work2: "person",
};

const line = 'fill="none" stroke="#000" stroke-opacity=".2" stroke-width="3"';

const shapes: Record<Kind, string> = {
  tee: `<path d="M140 110 L185 95 Q200 125 215 95 L260 110 L335 175 L298 212 L262 185 L262 405 L138 405 L138 185 L102 212 L65 175 Z"/>`,
  hoodie: `<path d="M140 125 L182 100 Q200 135 218 100 L260 125 L350 335 L310 352 L262 215 L262 415 L138 415 L138 215 L90 352 L50 335 Z"/><path d="M160 108 Q200 30 240 108 Q200 150 160 108 Z"/><path d="M165 330 L235 330 L248 395 L152 395 Z" ${line}/>`,
  jacket: `<path d="M140 125 L182 100 Q200 135 218 100 L260 125 L350 335 L310 352 L262 215 L262 415 L138 415 L138 215 L90 352 L50 335 Z"/><path d="M182 100 L200 165 L218 100" ${line}/><path d="M200 165 L200 415" ${line}/><path d="M152 330 L188 330 M212 330 L248 330" ${line}/>`,
  pants: `<path d="M145 80 L255 80 L268 230 L240 440 L208 440 L200 230 L192 440 L160 440 L132 230 Z"/><path d="M145 105 L255 105" ${line}/>`,
  dress: `<circle cx="200" cy="80" r="28"/><path d="M165 125 Q200 148 235 125 L228 240 L295 445 Q200 468 105 445 L172 240 Z"/>`,
  person: `<circle cx="200" cy="165" r="58"/><path d="M60 500 Q70 300 200 275 Q330 300 340 500 Z"/>`,
};

const art = (key: Slot) => {
  const isHero = key === "hero";
  const dark = key.startsWith("top") || key.startsWith("trend");
  const fill = dark ? "#14171B" : "#FFFFFF";
  const body = shapes[kinds[key]];
  const vb = isHero ? "0 0 1600 900" : "0 0 400 500";
  const inner = isHero
    ? `<g transform="translate(540 0) scale(1.8)">${body}</g>`
    : body;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><defs><radialGradient id="g" cx="50%" cy="38%" r="60%"><stop offset="0" stop-color="#FFFFFF" stop-opacity="${dark ? 0.9 : 0.3}"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><g fill="${fill}" fill-opacity="${dark ? 0.92 : 0.88}">${inner}</g></svg>`;
};

export const pic = (key: Slot, w = 900): string =>
  key === "hero" && !ids.hero
    ? ""
    : ids[key]
    ? img(ids[key], w)
    : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(art(key))}`;
