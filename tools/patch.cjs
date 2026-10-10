const fs = require("fs");

const edits = [
  // routes
  ["src/App.tsx",
   `import NotFound from "./pages/NotFound";`,
   `import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Delivery from "./pages/Delivery";`],
  ["src/App.tsx",
   `<Route path="/account" element={<Account />} />`,
   `<Route path="/account" element={<Account />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/delivery" element={<Delivery />} />`],

  // menu + footer
  ["src/components/layout/Navbar.tsx",
   `{ label: "Lookbook", to: "/lookbook" },`,
   `{ label: "Lookbook", to: "/lookbook" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },`],
  ["src/components/layout/Footer.tsx",
   `md:grid-cols-5`,
   `md:grid-cols-6`],
  ["src/components/layout/Footer.tsx",
   `title: "Account",`,
   `title: "Help",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Delivery and returns", to: "/delivery" },
    ],
  },
  {
    title: "Account",`],

  // search results open the product
  ["src/components/layout/SearchOverlay.tsx",
   `  const go = (t: string) => {`,
   `  const open = (id: string) => {
    onClose();
    nav("/product/" + id);
  };

  const go = (t: string) => {`],
  ["src/components/layout/SearchOverlay.tsx",
   `onClick={() => go(r.name)}`,
   `onClick={() => open(r.id)}`],

  // top clothing cards
  ["src/components/sections/TopClothing.tsx",
   `key={p.id}`,
   `key={p.id}
                id={p.id}`],

  // trending tiles
  ["src/components/sections/Trending.tsx",
   `import { motion } from "framer-motion";`,
   `import { motion } from "framer-motion";
import { Link } from "react-router-dom";`],
  ["src/components/sections/Trending.tsx",
   `<div className="relative aspect-square overflow-hidden rounded-xl bg-[#EEF1F2]">`,
   `<div className="relative aspect-square overflow-hidden rounded-xl bg-[#EEF1F2]">
        <Link to={"/product/" + id} aria-label={name} className="absolute inset-0 z-10" />`],
  ["src/components/sections/Trending.tsx",
   `className="absolute inset-x-3 bottom-3 translate-y-0`,
   `className="absolute inset-x-3 bottom-3 z-20 translate-y-0`],
  ["src/components/sections/Trending.tsx",
   `<h3 className="text-[13px] font-medium md:text-sm">{name}</h3>`,
   `<h3 className="text-[13px] font-medium md:text-sm">
            <Link to={"/product/" + id} className="hover:underline">{name}</Link>
          </h3>`],

  // shop cards
  ["src/pages/Shop.tsx",
   `import { useSearchParams } from "react-router-dom";`,
   `import { Link, useSearchParams } from "react-router-dom";`],
  ["src/pages/Shop.tsx",
   `<div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#EEF5F7]">`,
   `<div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#EEF5F7]">
                    <Link to={"/product/" + i.id} aria-label={i.name} className="absolute inset-0 z-10" />`],
  ["src/pages/Shop.tsx",
   `<h3 className="text-[13px] font-medium md:text-sm">{i.name}</h3>`,
   `<h3 className="text-[13px] font-medium md:text-sm">
                        <Link to={"/product/" + i.id} className="hover:underline">{i.name}</Link>
                      </h3>`],
];

let bad = 0;
for (const [file, from, to] of edits) {
  const src = fs.readFileSync(file, "utf8");
  if (!src.includes(from)) {
    console.log("NOT FOUND in " + file + ": " + from.slice(0, 60));
    bad++;
    continue;
  }
  fs.writeFileSync(file, src.replace(from, () => to));
}
console.log(bad ? bad + " edit(s) skipped" : "all edits applied");
