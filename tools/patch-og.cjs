const fs = require("fs");

const titles = `const titles: Record<string, string> = {
  "/": "KYRO | Wear tomorrow, today",
  "/shop": "Shop | KYRO",
  "/trending": "Trending | KYRO",
  "/reviews": "Reviews | KYRO",
  "/lookbook": "Lookbook | KYRO",
  "/about": "About | KYRO",
  "/contact": "Contact | KYRO",
  "/delivery": "Delivery and returns | KYRO",
  "/checkout": "Checkout | KYRO",
  "/account": "Account | KYRO",
  "/privacy": "Privacy Policy | KYRO",
  "/terms": "Terms of Service | KYRO",
  "/cookies": "Cookie Policy | KYRO",
  "/credits": "Photo credits | KYRO",
};

const pageTitle = (p: string) =>
  titles[p] ?? (p.startsWith("/product/") ? "Product | KYRO" : "KYRO");

function ScrollTop() {`;

const edits = [
  ["src/App.tsx",
   `import NotFound from "./pages/NotFound";`,
   `import NotFound from "./pages/NotFound";
import OgCard from "./pages/OgCard";`],
  ["src/App.tsx",
   `<Route path="*" element={<NotFound />} />`,
   `<Route path="/og" element={<OgCard />} />
        <Route path="*" element={<NotFound />} />`],
  ["src/App.tsx", `function ScrollTop() {`, titles],
  ["src/App.tsx",
   `    window.scrollTo(0, 0);
  }, [pathname]);`,
   `    window.scrollTo(0, 0);
    document.title = pageTitle(pathname);
  }, [pathname]);`],
];

let bad = 0;
for (const [file, from, to] of edits) {
  const src = fs.readFileSync(file, "utf8");
  if (!src.includes(from)) {
    console.log("NOT FOUND in " + file + ": " + from.slice(0, 50));
    bad++;
    continue;
  }
  fs.writeFileSync(file, src.replace(from, () => to));
}
console.log(bad ? bad + " edit(s) skipped" : "all edits applied");
