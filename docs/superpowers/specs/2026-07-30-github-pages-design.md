# GitHub Pages Dual-Deployment Design

## Goal

Publish the existing Xitao Liao portfolio automatically at
`https://yuriknight01-web.github.io/Porfolio/` after every push to `main`,
without breaking the existing Sites deployment.

## Architecture

The repository keeps two independent build targets:

- `vinext build` remains the production build for Sites.
- `next build` runs with `GITHUB_PAGES=true` to produce a static `out/`
  directory for GitHub Pages.

`next.config.ts` conditionally enables static export, trailing slashes,
`basePath: "/Porfolio"`, and `assetPrefix: "/Porfolio/"` only for the Pages
build. Local development and Sites continue to use root-relative behavior.

## Asset Strategy

Public image references use a small deployment-aware prefix helper. The helper
returns an empty prefix for local/Sites builds and `/Porfolio` for GitHub Pages.
This prevents the AI Creator Studio screenshot and favicon from resolving at
the GitHub account root.

Internal hash navigation remains unchanged because section links target the
current document.

## Automation

`.github/workflows/deploy-pages.yml`:

- Runs on pushes to `main` and manual dispatch.
- Uses Node 22 and pnpm.
- Installs dependencies with the committed lockfile.
- Runs the portfolio tests.
- Builds the static Pages output.
- Uploads `out/` as the Pages artifact.
- Deploys through the official GitHub Pages action.
- Uses the minimum required permissions: `contents: read`, `pages: write`, and
  `id-token: write`.
- Uses a concurrency group so a newer deployment supersedes an older queued
  deployment.

## Validation

Local tests must verify:

- The conditional Pages configuration contains the exact `/Porfolio` base path.
- A `build:pages` script exists.
- The workflow deploys `out/` and runs only from `main` or manual dispatch.
- The page prefixes public assets only for Pages.
- The existing portfolio contract still passes.
- A local static export produces `out/index.html` and the referenced image path
  exists beneath `out/Porfolio`-aware URLs.

The existing Sites build must also continue to succeed.

## GitHub Setting

GitHub Pages Source must be changed from `Deploy from a branch` to
`GitHub Actions`. After that one-time setting change, every push to `main`
deploys automatically.
