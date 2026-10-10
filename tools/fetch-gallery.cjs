const fs = require("fs");
const path = require("path");

const KEY = process.env.UNSPLASH_KEY;
if (!KEY) {
  console.log("Missing key. Run: UNSPLASH_KEY=yourkey node tools/fetch-gallery.cjs");
  process.exit(1);
}

const UTM = "?utm_source=kyro_demo&utm_medium=referral";
const auth = { Authorization: "Client-ID " + KEY };

// product id: [card slot, [[colour name, swatch hex, search words, photos], ...]]
const plan = {
  p1: ["top1", [["Blue", "#5B7FA3", "blue patterned shirt", 3]]],
  p2: ["top2", [["Black", "#14171B", "black long sleeve top", 3], ["White", "#EDEDEA", "white long sleeve top", 3]]],
  p3: ["top3", [["Navy", "#1F2A44", "navy printed shirt", 3]]],
  p4: ["top4", [["White", "#EDEDEA", "white graphic t-shirt", 3], ["Black", "#14171B", "black graphic t-shirt", 3]]],
  p5: ["top5", [["Olive", "#5E6B3A", "olive cargo jacket", 3], ["Black", "#14171B", "black cargo jacket", 3]]],
  p6: ["top6", [["Cream", "#E8DCC4", "cream knit polo shirt", 3]]],
  t1: ["trend1", [["White", "#EDEDEA", "white t-shirt", 3], ["Black", "#14171B", "black t-shirt", 3]]],
  t2: ["trend2", [["Black", "#14171B", "black sweater men", 3]]],
  t3: ["trend3", [["Grey", "#8A8F96", "grey jogger pants", 3]]],
  t4: ["trend4", [["Pink", "#E7A3B5", "pink top woman", 3]]],
  t5: ["trend5", [["Black", "#14171B", "black hoodie", 3], ["Grey", "#8A8F96", "grey hoodie", 3]]],
  t6: ["trend6", [["Black", "#14171B", "black blazer", 3], ["Beige", "#D8C7A8", "beige blazer", 3]]],
};

const pickedFile = path.join("src", "data", "picked.ts");
const creditsFile = path.join("src", "data", "credits.ts");
const galleryFile = path.join("src", "data", "gallery.ts");

const load = (file) => {
  try {
    const txt = fs.readFileSync(file, "utf8");
    const m = txt.match(/=\s*(\{[\s\S]*\});?\s*$/);
    return m ? JSON.parse(m[1]) : {};
  } catch (e) {
    return {};
  }
};

const picked = load(pickedFile);
const credits = load(creditsFile);
const gallery = load(galleryFile);

const save = () => {
  fs.writeFileSync(
    pickedFile,
    "export const picked: Record<string, string> = " + JSON.stringify(picked, null, 2) + ";\n"
  );
  fs.writeFileSync(
    creditsFile,
    "export const credits: Record<string, { name: string; url: string }> = " +
      JSON.stringify(credits, null, 2) + ";\n"
  );
  fs.writeFileSync(
    galleryFile,
    "export type GalleryColor = { name: string; hex: string; ids: string[] };\n\n" +
      "export const gallery: Record<string, GalleryColor[]> = " +
      JSON.stringify(gallery, null, 2) + ";\n"
  );
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
class RateLimit extends Error {}

const search = async (query) => {
  const url =
    "https://api.unsplash.com/search/photos?" +
    new URLSearchParams({
      query,
      orientation: "portrait",
      per_page: "15",
      content_filter: "high",
    });
  const res = await fetch(url, { headers: auth });
  if (res.status === 403 || res.status === 429) throw new RateLimit();
  if (!res.ok) throw new Error(res.status + " " + res.statusText);
  return (await res.json()).results || [];
};

const used = new Set([
  ...Object.values(picked),
  ...Object.values(gallery).flatMap((cs) => cs.flatMap((c) => c.ids)),
]);

(async () => {
  try {
    for (const [pid, [slot, colors]] of Object.entries(plan)) {
      gallery[pid] = gallery[pid] || [];
      for (let ci = 0; ci < colors.length; ci++) {
        const [cname, hex, q, n] = colors[ci];
        const have = gallery[pid][ci];
        if (have && have.ids.length >= n) continue;

        const results = await search(q);
        const chosen = [];
        for (const r of results) {
          const m = ((r.urls && r.urls.raw) || "").match(/(photo-[\w-]+)/);
          if (!m || used.has(m[1])) continue;
          used.add(m[1]);
          chosen.push({ id: m[1], r });
          if (chosen.length === n) break;
        }
        if (!chosen.length) {
          console.log("none  " + pid + " " + cname);
          continue;
        }

        for (let i = 0; i < chosen.length; i++) {
          const { r } = chosen[i];
          credits[pid + "-" + ci + "-" + i] = {
            name: (r.user && r.user.name) || "Unsplash photographer",
            url:
              ((r.user && r.user.links && r.user.links.html) || "https://unsplash.com") + UTM,
          };
          if (r.links && r.links.download_location) {
            try {
              await fetch(r.links.download_location, { headers: auth });
            } catch (e) {}
          }
        }

        gallery[pid][ci] = { name: cname, hex, ids: chosen.map((c) => c.id) };
        if (ci === 0) picked[slot] = chosen[0].id;
        console.log("ok    " + pid + " " + cname + " (" + chosen.length + " photos)");
        save();
        await sleep(500);
      }
    }
    console.log("All products done.");
  } catch (e) {
    if (e instanceof RateLimit) {
      console.log("Rate limit reached. Run the same command again in about an hour. Progress is saved.");
    } else {
      console.log("fail: " + e.message);
    }
  }
  save();
})();
