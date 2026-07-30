const pagesBasePath =
  process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/Porfolio" : "";

export function withBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${pagesBasePath}${normalizedPath}`;
}
