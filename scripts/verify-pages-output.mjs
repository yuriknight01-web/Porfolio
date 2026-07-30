import { access, readFile } from "node:fs/promises";

const outputRoot = new URL("../out/", import.meta.url);
const html = await readFile(new URL("index.html", outputRoot), "utf8");

await Promise.all([
  access(new URL("ai-creator-studio.png", outputRoot)),
  access(new URL("favicon.svg", outputRoot)),
]);

for (const expectedPath of [
  "/Porfolio/_next/",
  "/Porfolio/favicon.svg",
  "/Porfolio/ai-creator-studio.png",
]) {
  if (!html.includes(expectedPath)) {
    throw new Error(`Static export is missing ${expectedPath}`);
  }
}

console.log("GitHub Pages output verified.");
