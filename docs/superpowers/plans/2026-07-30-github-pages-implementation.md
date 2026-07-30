# GitHub Pages Dual-Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an automatic GitHub Pages deployment at `/Porfolio/` while preserving the existing Sites build.

**Architecture:** `next.config.ts` conditionally enables `output: "export"`, `trailingSlash`, and `basePath` only when `GITHUB_PAGES=true`. A small public-asset prefix helper keeps root deployment assets unchanged and prefixes them for Pages. A GitHub Actions workflow tests, exports `out/`, uploads the artifact, and deploys it.

**Tech Stack:** Next.js 16, React 19, TypeScript, Node test runner, pnpm, GitHub Actions, GitHub Pages.

## Global Constraints

- Pages repository path is exactly `/Porfolio`.
- Existing `vinext build` and Sites hosting must continue to work.
- Pages output is static and must land in `out/`.
- Workflow runs on `main` pushes and manual dispatch.
- Workflow permissions are limited to `contents: read`, `pages: write`, and `id-token: write`.

---

### Task 1: Define Deployment Contract

**Files:**
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: `next.config.ts`, `package.json`, `app/page.tsx`, and `.github/workflows/deploy-pages.yml`.
- Produces: failing tests for Pages configuration, asset prefixing, and workflow behavior.

- [ ] Add tests asserting `GITHUB_PAGES`, `output: "export"`, `/Porfolio`, `build:pages`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4`, `actions/deploy-pages@v4`, and artifact path `out`.
- [ ] Run the Node test suite and confirm the new contract fails because Pages support does not exist.
- [ ] Commit the failing contract as `test: define GitHub Pages deployment contract`.

### Task 2: Implement Static Export

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json`
- Create: `scripts/build-pages.mjs`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Create: `lib/public-path.ts`

**Interfaces:**
- Produces: `withBasePath(path: string): string`, returning `/Porfolio${path}` only when `NEXT_PUBLIC_GITHUB_PAGES` is `true`.

- [ ] Implement conditional static export settings in `next.config.ts`.
- [ ] Add `build:pages` using a cross-platform Node script that starts `next build` with `NEXT_PUBLIC_GITHUB_PAGES=true` and `GITHUB_PAGES=true`.
- [ ] Prefix public image and favicon paths through the deployment-aware helper/config.
- [ ] Run tests and confirm the contract passes.

### Task 3: Add GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

**Interfaces:**
- Consumes: `pnpm-lock.yaml`, `build:pages`, and `out/`.
- Produces: a GitHub Pages deployment from every `main` push.

- [ ] Add checkout, pnpm setup, Node 22 setup, frozen dependency install, tests, static export, Pages configuration, artifact upload, and deployment jobs.
- [ ] Use official action versions verified in GitHub documentation.
- [ ] Run tests again and confirm workflow contract passes.

### Task 4: Validate Both Targets and Publish

**Files:**
- No new production files.

**Interfaces:**
- Produces: verified `out/index.html`, valid `/Porfolio` asset references, successful Sites build, and an updated `main` branch.

- [ ] Run the complete Node test suite.
- [ ] Run the GitHub Pages static export and verify `out/index.html`, `out/ai-creator-studio.png`, and `/Porfolio/_next/` references.
- [ ] Run the existing vinext production build.
- [ ] Commit as `feat: automate GitHub Pages deployment`.
- [ ] Push `main` to GitHub and verify the remote commit matches local HEAD.
