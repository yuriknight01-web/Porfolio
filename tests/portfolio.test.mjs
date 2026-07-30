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

test("styles include the approved palette and motion fallback", () => {
  assert.match(css, /#090909/i);
  assert.match(css, /#c8ff3d/i);
  assert.match(css, /prefers-reduced-motion/);
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
