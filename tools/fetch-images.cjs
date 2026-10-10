const fs = require("fs");
const path = require("path");

const KEY = process.env.UNSPLASH_KEY;
if (!KEY) {
  console.log("Missing key. Run: UNSPLASH_KEY=yourkey node tools/fetch-images.cjs");
  process.exit(1);
}

// slot: [search words, orientation]
const slots = {
  hero: ["young man yellow hoodie", "portrait"],
  look1: ["woman green dress", "portrait"],
  look2: ["woman red dress", "portrait"],
  look3: ["woman blue dress", "portrait"],
  look4: ["woman skirt white top", "portrait"],
  top1: ["patterned shirt", "portrait"],
  top2: ["black long sleeve shirt", "portrait"],
  top3: ["dark printed shirt", "portrait"],
  top4: ["graphic t-shirt", "portrait"],
  top5: ["cargo jacket", "portrait"],
  top6: ["knit polo shirt", "portrait"],
  style1: ["woman pink jacket", "landscape"],
  style2: ["two people colorful coats", "landscape"],
  trend1: ["t-shirt", "squarish"],
  trend2: ["men black sweater", "squarish"],
  trend3: ["jogger pants", "squarish"],
  trend4: ["woman pink top", "squarish"],
  trend5: ["black hoodie", "squarish"],
  trend6: ["blazer", "squarish"],
  work1: ["woman white top skirt hat", "portrait"],
  work2: ["colorful puffer jacket", "portrait"],
};

const args = process.argv.slice(2);
const arg = (n) => {
  const i = args.indexOf("--" + n);
  return i >= 0 ? args[i + 1] : undefined;
};
const only = arg("only");
const page = arg("page") || "1";
const customQ = arg("q");

const file = path.join("src", "data", "picked.ts");
let picked = {};
try {
  const txt = fs.readFileSync(file, "utf8");
  const m = txt.match(/=\s*(\{[\s\S]*\});?\s*$/);
  if (m) picked = JSON.parse(m[1]);
} catch (e) {}

const pickOne = async (slot, query, orient) => {
  const url =
    "https://api.unsplash.com/search/photos?" +
    new URLSearchParams({
      query,
      orientation: orient,
      per_page: "10",
      page,
      content_filter: "high",
    });
  const res = await fetch(url, { headers: { Authorization: "Client-ID " + KEY } });
  if (!res.ok) throw new Error(res.status + " " + res.statusText);
  const data = await res.json();
  const used = new Set(
    Object.entries(picked)
      .filter(([k]) => k !== slot)
      .map(([, v]) => v)
  );
  for (const r of data.results || []) {
    const m = ((r.urls && r.urls.raw) || "").match(/(photo-[\w-]+)/);
    if (m && !used.has(m[1])) return m[1];
  }
  return "";
};

(async () => {
  const list = only ? [only] : Object.keys(slots);
  for (const s of list) {
    if (!slots[s]) {
      console.log("Unknown slot: " + s);
      continue;
    }
    const [q, o] = slots[s];
    const query = only && customQ ? customQ : q;
    try {
      const id = await pickOne(s, query, o);
      if (id) {
        picked[s] = id;
        console.log("ok    " + s + "  (" + query + ")");
      } else {
        console.log("none  " + s);
      }
    } catch (e) {
      console.log("fail  " + s + ": " + e.message);
    }
  }
  fs.writeFileSync(
    file,
    "export const picked: Record<string, string> = " + JSON.stringify(picked, null, 2) + ";\n"
  );
  console.log("saved to " + file);
})();
