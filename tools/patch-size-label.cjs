const fs = require("fs");
const edits = [
  ["src/components/layout/BagDrawer.tsx",
   `<p className="text-xs text-fog">Size {l.size}</p>`,
   `<p className="text-xs text-fog">{l.size.includes("·") ? l.size : "Size " + l.size}</p>`],
  ["src/pages/Checkout.tsx",
   `<p className="text-xs text-ink/50">Size {l.size}</p>`,
   `<p className="text-xs text-ink/50">{l.size.includes("·") ? l.size : "Size " + l.size}</p>`],
];
for (const [f, a, b] of edits) {
  const s = fs.readFileSync(f, "utf8");
  if (!s.includes(a)) { console.log("NOT FOUND in " + f); continue; }
  fs.writeFileSync(f, s.replace(a, () => b));
  console.log("patched " + f);
}
