import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(
  new URL("../app/page.tsx", import.meta.url),
  "utf8",
);
const layout = await readFile(
  new URL("../app/layout.tsx", import.meta.url),
  "utf8",
);
const css = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const nextConfig = await readFile(
  new URL("../next.config.ts", import.meta.url),
  "utf8",
);
const packageJson = await readFile(
  new URL("../package.json", import.meta.url),
  "utf8",
);

async function readOptional(path) {
  try {
    return await readFile(new URL(path, import.meta.url), "utf8");
  } catch {
    return "";
  }
}

const pagesBuild = await readOptional("../scripts/build-pages.mjs");
const pagesVerifier = await readOptional("../scripts/verify-pages-output.mjs");
const pagesTsConfig = await readOptional("../tsconfig.pages.json");
const pnpmWorkspace = await readOptional("../pnpm-workspace.yaml");
const pagesWorkflow = await readOptional(
  "../.github/workflows/deploy-pages.yml",
);

test("page presents Xitao as a Product Designer", () => {
  assert.match(page, /Xitao/);
  assert.match(page, /Product Designer/);
  assert.match(page, /AI-powered creator tools/);
});

test("page exposes the editorial sections and two MVP projects", () => {
  for (const id of ["summary", "about", "projects", "skills", "contact"]) {
    assert.match(page, new RegExp(`id=["']${id}["']`));
  }
  assert.match(page, /AI Creator Studio/);
  assert.match(page, /Fluffy Star Auto Battler/);
});

test("project cards use editorial visuals and link to both live MVPs", () => {
  assert.match(page, /<h2>Project<\/h2>/);
  assert.match(page, /className="creator-visual"/);
  assert.match(page, /AI CREATOR/);
  assert.match(page, /AI WORKFLOW SAAS/);
  assert.match(
    page,
    /https:\/\/yuriknight01-web\.github\.io\/ai-creator-studio\//,
  );
  assert.match(
    page,
    /https:\/\/yuriknight01-web\.github\.io\/fluffy-lineup-portfolio\//,
  );
  assert.doesNotMatch(page, /ai-creator-studio\.png/);
  assert.doesNotMatch(page, /<img/);
});

test("styles include the approved palette and motion fallback", () => {
  assert.match(css, /#090909/i);
  assert.match(css, /#c8ff3d/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(
    css,
    /\.project-wordmark\s*\{[^}]*white-space:\s*nowrap;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*620px\)[\s\S]*?\.project-wordmark\s*\{[^}]*font-size:\s*17\.5vw;/,
  );
});

test("finished metadata replaces the starter preview", () => {
  assert.match(layout, /Xitao Liao/);
  assert.match(layout, /AI Product Designer/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview/);
});

test("unavailable links are represented without broken hash navigation", () => {
  assert.match(page, /aria-disabled/);
  assert.doesNotMatch(page, /href=["']#["']/);
});

test("GitHub Pages build exports beneath the repository base path", () => {
  assert.match(nextConfig, /GITHUB_PAGES/);
  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(nextConfig, /basePath/);
  assert.match(nextConfig, /\/Porfolio/);
  assert.match(nextConfig, /tsconfig\.pages\.json/);
  assert.match(packageJson, /"build:pages":\s*"node scripts\/build-pages\.mjs"/);
  assert.match(
    packageJson,
    /"verify:pages":\s*"node scripts\/verify-pages-output\.mjs"/,
  );
  for (const dependency of ["esbuild", "sharp", "unrs-resolver", "workerd"]) {
    assert.match(pnpmWorkspace, new RegExp(`${dependency}: true`));
  }
  assert.match(pagesBuild, /NEXT_PUBLIC_GITHUB_PAGES/);
  assert.match(pagesBuild, /GITHUB_PAGES/);
  assert.match(pagesVerifier, /\/Porfolio\/_next\//);
  assert.match(pagesVerifier, /\/Porfolio\/favicon\.svg/);
  assert.doesNotMatch(
    pagesVerifier,
    /access\(new URL\("ai-creator-studio\.png"/,
  );
  assert.doesNotMatch(pagesVerifier, /\/Porfolio\/ai-creator-studio\.png/);
  assert.match(pagesVerifier, /AI CREATOR/);
  assert.match(pagesVerifier, /AI WORKFLOW SAAS/);
  assert.match(pagesTsConfig, /"app\/\*\*\/\*\.tsx"/);
  assert.match(pagesTsConfig, /"lib\/\*\*\/\*\.ts"/);
});

test("GitHub Pages keeps its prefixed favicon without the removed screenshot", () => {
  assert.match(layout, /\/Porfolio\/favicon\.svg/);
  assert.doesNotMatch(page, /ai-creator-studio\.png/);
});

test("GitHub Actions deploys the static output from main", () => {
  assert.match(pagesWorkflow, /branches:\s*\[main\]/);
  assert.match(pagesWorkflow, /workflow_dispatch/);
  assert.match(pagesWorkflow, /actions\/configure-pages@v5/);
  assert.match(pagesWorkflow, /actions\/upload-pages-artifact@v4/);
  assert.match(pagesWorkflow, /actions\/deploy-pages@v4/);
  assert.match(pagesWorkflow, /path:\s*\.\/out/);
  assert.match(pagesWorkflow, /pnpm verify:pages/);
  assert.match(pagesWorkflow, /pages:\s*write/);
  assert.match(pagesWorkflow, /id-token:\s*write/);
});
