/** Public-folder URLs for GitHub Pages (repo subpath in production). */
export function publicUrl(path: string): string {
  const p = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? `${base}${p}` : `${base}/${p}`;
}
