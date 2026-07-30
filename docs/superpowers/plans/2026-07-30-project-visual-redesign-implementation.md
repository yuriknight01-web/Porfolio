# Project Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the AI Creator Studio screenshot with a cyan typography-led visual matching the Fluffy card, and rename the selected-work heading to `Project`.

**Architecture:** Keep the existing project data and shared card shell. Render a tone-specific decorative visual for each project inside the common `.project-visual` container, with shared layout primitives and project-specific colors. Update the static-output verifier so the removed raster asset is no longer part of the deployment contract.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS, Node test runner, GitHub Pages static export

## Global Constraints

- The selected-work heading must be exactly `Project`.
- Keep `02 / SELECTED WORK` and the existing explanatory paragraph.
- AI Creator Studio must not reference or ship `ai-creator-studio.png`.
- AI Creator Studio must display `AI CREATOR` / `STUDIO` and `AI WORKFLOW SAAS`.
- Keep the existing project information areas and the Fluffy visual unchanged.
- New visual decoration must be hidden from assistive technology.
- Existing reduced-motion handling and responsive behavior must remain valid.

---

### Task 1: Replace the AI project image with a typography visual

**Files:**
- Modify: `tests/portfolio.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Delete: `public/ai-creator-studio.png`

**Interfaces:**
- Consumes: the existing `projects` entries and `.project-visual` card shell.
- Produces: `.creator-visual`, `.creator-node`, and shared `.project-wordmark` markup and styles.

- [ ] **Step 1: Write the failing source contract test**

Add a test that asserts the exact heading and AI wordmark copy while rejecting
the old asset:

```js
test("AI Creator Studio uses an editorial wordmark instead of a screenshot", () => {
  assert.match(page, /<h2>Project<\/h2>/);
  assert.match(page, /className="creator-visual"/);
  assert.match(page, /AI CREATOR/);
  assert.match(page, /AI WORKFLOW SAAS/);
  assert.doesNotMatch(page, /ai-creator-studio\.png/);
  assert.doesNotMatch(page, /<img/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
pnpm test
```

Expected: the new test fails because the heading, creator visual, and removal
of the old screenshot are not implemented.

- [ ] **Step 3: Implement the minimal page markup**

Remove the `withBasePath` import and the `image` / `imageAlt` properties from
the AI project. Replace the conditional image branch with tone-specific
decorative markup:

```tsx
<div className="project-visual">
  {project.tone === "creator" ? (
    <div className="creator-visual" aria-hidden="true">
      <span className="creator-orbit creator-orbit--one" />
      <span className="creator-orbit creator-orbit--two" />
      <span className="creator-node">AI</span>
      <strong className="project-wordmark">
        AI CREATOR
        <br />
        STUDIO
      </strong>
      <small>AI WORKFLOW SAAS</small>
    </div>
  ) : (
    <div className="fluffy-visual" aria-hidden="true">
      <span className="orbit orbit--one" />
      <span className="orbit orbit--two" />
      <span className="fluffy-star">✦</span>
      <strong>FLUFFY<br />STAR</strong>
      <small>AUTO BATTLER</small>
    </div>
  )}
  <span className="project-number">{project.number}</span>
</div>
```

Change:

```tsx
<h2>Products, not just pictures.</h2>
```

to:

```tsx
<h2>Project</h2>
```

- [ ] **Step 4: Add the creator visual styles**

Use the same centering and sizing model as Fluffy, with project-specific
colors:

```css
.project-card--creator .project-visual {
  background:
    radial-gradient(circle at 50% 42%, rgba(49, 210, 255, 0.18), transparent 22%),
    linear-gradient(135deg, #071825, #080a0d 62%);
}

.creator-visual {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.project-wordmark {
  z-index: 1;
  color: var(--paper);
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(4.6rem, 10.5vw, 10.5rem);
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.68;
}

.creator-visual small {
  z-index: 1;
  margin-top: 56px;
  color: #31d2ff;
  font-family: var(--font-mono), monospace;
  letter-spacing: 0.5em;
}

.creator-node {
  position: absolute;
  top: 10%;
  display: grid;
  width: clamp(3rem, 6vw, 6rem);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid #31d2ff;
  border-radius: 50%;
  color: #31d2ff;
  font-family: var(--font-mono), monospace;
}

.creator-orbit {
  position: absolute;
  border: 1px solid rgba(49, 210, 255, 0.28);
  border-radius: 50%;
}

.creator-orbit--one {
  width: min(70vw, 820px);
  aspect-ratio: 1;
}

.creator-orbit--two {
  width: min(45vw, 520px);
  aspect-ratio: 1;
  border-style: dashed;
  transform: rotate(-24deg);
}
```

At the existing `max-width: 620px` breakpoint, set:

```css
.project-wordmark {
  font-size: 21vw;
}

.creator-orbit--one {
  width: 130vw;
}

.creator-orbit--two {
  width: 90vw;
}
```

- [ ] **Step 5: Delete the obsolete raster asset**

Remove `public/ai-creator-studio.png`.

- [ ] **Step 6: Run the source tests and verify GREEN**

Run:

```powershell
pnpm test
```

Expected: the new source contract and all existing applicable tests pass.

- [ ] **Step 7: Commit the visual implementation**

```powershell
git add app/page.tsx app/globals.css tests/portfolio.test.mjs
git add -u public/ai-creator-studio.png
git commit -m "feat: replace creator screenshot with wordmark"
```

---

### Task 2: Update and verify the GitHub Pages deployment contract

**Files:**
- Modify: `scripts/verify-pages-output.mjs`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: the static export written to `out/`.
- Produces: a verifier that requires the site shell and favicon but rejects references to the deleted creator screenshot.

- [ ] **Step 1: Write the failing deployment-verifier test**

Replace the assertions that require the old asset with:

```js
assert.doesNotMatch(pagesVerifier, /access\(new URL\("ai-creator-studio\.png"/);
assert.doesNotMatch(pagesVerifier, /\/Porfolio\/ai-creator-studio\.png/);
assert.match(pagesVerifier, /AI CREATOR/);
assert.match(pagesVerifier, /AI WORKFLOW SAAS/);
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
pnpm test
```

Expected: failure because `scripts/verify-pages-output.mjs` still requires the
old image and does not verify the new wordmark copy.

- [ ] **Step 3: Update the output verifier**

Keep the favicon access check, remove the image access check, remove the old
image URL from `expectedPath`, and add an HTML-copy check:

```js
await access(new URL("favicon.svg", outputRoot));

for (const expectedPath of ["/Porfolio/_next/", "/Porfolio/favicon.svg"]) {
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
```

- [ ] **Step 4: Run all automated verification**

Run:

```powershell
pnpm test
pnpm build:pages
pnpm verify:pages
```

Expected: all tests pass, Next.js creates a static export, and the verifier
reports `GitHub Pages output verified.`

- [ ] **Step 5: Run desktop and mobile visual checks**

Serve the static export locally and inspect:

- Desktop at 1440 × 1000: heading reads `Project`; AI and Fluffy visual panels
  share height and hierarchy; AI has no screenshot.
- Mobile at 390 × 844: both wordmarks remain legible; orbit decoration clips
  cleanly; project metadata stacks without horizontal overflow.
- Reduced motion: no required information depends on animation.

- [ ] **Step 6: Commit the deployment contract**

```powershell
git add scripts/verify-pages-output.mjs tests/portfolio.test.mjs
git commit -m "test: update pages contract for creator wordmark"
```

- [ ] **Step 7: Push and verify production**

```powershell
git push origin main
```

Wait for `Deploy portfolio to GitHub Pages` to succeed, then verify
`https://yuriknight01-web.github.io/Porfolio/` contains `Project`,
`AI CREATOR`, and `AI WORKFLOW SAAS`, contains no
`ai-creator-studio.png` reference, and loads key CSS/font assets with HTTP 200.
