export function serverApiUrl(path: string): string {
  const baseUrl = process.env.HYPERNEWS_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");
  return `${cleanBase}/${cleanPath}`;
}
