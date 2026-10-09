const fs = require("fs");
const keys = [
  "hero","look1","look2","look3","look4",
  "top1","top2","top3","top4","top5","top6",
  "style1","style2",
  "trend1","trend2","trend3","trend4","trend5","trend6",
  "work1","work2",
];
const lines = fs.readFileSync("urls.txt", "utf8").split("\n").map((s) => s.trim());
const rows = keys.map((k, i) => {
  const m = (lines[i] || "").match(/(photo-[\w-]+)/);
  return `  ${k}: "${m ? m[1] : ""}",`;
});
const out = `import { img } from "../lib/motion";

const ids = {
${rows.join("\n")}
};

export type Slot = keyof typeof ids;

export const pic = (key: Slot, w = 900) =>
  ids[key] ? img(ids[key], w) : "";
`;
fs.writeFileSync("src/data/images.ts", out);
console.log("done:", rows.filter((r) => !r.includes('""')).length, "of", keys.length, "filled");
