const fs = require("fs");
const domain = (process.argv[2] || "").replace(/\/$/, "");
if (!domain.startsWith("http")) {
  console.log("Usage: node tools/patch-meta.cjs https://your-site.vercel.app");
  process.exit(1);
}

const title = "KYRO | Wear tomorrow, today";
const desc = "Simple clothes that look good and feel good. New drops every week.";

const block = `<!-- og:start -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="KYRO" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${domain}/" />
    <meta property="og:image" content="${domain}/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${domain}/og.png" />
    <!-- og:end -->`;

let html = fs.readFileSync("index.html", "utf8");
html = html.replace(
  '<link rel="icon" type="image/svg+xml" href="/vite.svg" />',
  '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'
);
html = html.replace(/<!-- og:start -->[\s\S]*?<!-- og:end -->\s*/, "");
html = html.replace("</head>", () => "    " + block + "\n  </head>");
fs.writeFileSync("index.html", html);
console.log("index.html updated for " + domain);
