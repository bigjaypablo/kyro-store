const fs = require("fs");

const files = [
  ["src/components/sections/Reviews.tsx", "../ui/Avatar"],
  ["src/pages/ReviewsPage.tsx", "../components/ui/Avatar"],
];

const re =
  /<span className="flex h-8 w-8[^>]*>\s*\{r\.name\.split\(" "\)\.map\(\(w\) => w\[0\]\)\.join\(""\)\}\s*<\/span>/;

for (const [file, imp] of files) {
  let src = fs.readFileSync(file, "utf8");
  if (src.includes("<Avatar")) {
    console.log("already done: " + file);
    continue;
  }
  if (!re.test(src)) {
    console.log("NOT FOUND in " + file);
    continue;
  }
  src = src.replace(re, "<Avatar name={r.name} />");
  src = 'import Avatar from "' + imp + '";\n' + src;
  fs.writeFileSync(file, src);
  console.log("patched " + file);
}
