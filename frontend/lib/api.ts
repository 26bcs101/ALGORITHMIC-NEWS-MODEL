export function apiUrl(path: string): string {
  const cleanPath = path.replace(/^\//, "");
  return `/api/${cleanPath}`;
}
