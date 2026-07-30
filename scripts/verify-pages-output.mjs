import { access, readFile } from "node:fs/promises";

const outputRoot = new URL("../out/", import.meta.url);
const html = await readFile(new URL("index.html", outputRoot), "utf8");

await access(new URL("favicon.svg", outputRoot));

for (const expectedPath of [
  "/Porfolio/_next/",
  "/Porfolio/favicon.svg",
]) {
  if (!html.includes(expectedPath)) {
    throw new Error(`Static export is missing ${expectedPath}`);
  }
}

for (const expectedCopy of ["AI CREATOR", "AI WORKFLOW SAAS"]) {
  if (!html.includes(expectedCopy)) {
    throw new Error(`Static export is missing ${expectedCopy}`);
  }
}

if (html.includes("ai-creator-studio.png")) {
  throw new Error("Static export still references ai-creator-studio.png");
}

console.log("GitHub Pages output verified.");
