const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const frontendDir = path.join(root, "frontend");
const databaseDir = path.join(root, "database");
const docsDir = path.join(root, "docs");
const docsDataDir = path.join(docsDir, "data");

function copyFile(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

fs.rmSync(docsDir, { recursive: true, force: true });
fs.mkdirSync(docsDataDir, { recursive: true });

copyFile(path.join(frontendDir, "styles.css"), path.join(docsDir, "styles.css"));
copyFile(path.join(frontendDir, "app.js"), path.join(docsDir, "app.js"));
copyFile(path.join(databaseDir, "site-content.json"), path.join(docsDataDir, "site-content.json"));

const indexHtml = fs
  .readFileSync(path.join(frontendDir, "index.html"), "utf8")
  .replace(
    '<script src="app.js"></script>',
    '<script>window.SITE_CONTENT_URL = "data/site-content.json";</script>\n    <script src="app.js"></script>',
  );

fs.writeFileSync(path.join(docsDir, "index.html"), indexHtml);

console.log("GitHub Pages files generated in docs/.");
