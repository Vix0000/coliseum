/** Vite `base` without a trailing slash. Empty when the app is hosted at `/`. */
export function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '');
}

/** In-app route from the browser pathname, with the Vite base stripped. */
export function pathFromLocation(pathname = window.location.pathname): string {
  const base = getBasePath();
  let path = pathname || '/';
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || '/';
  }
  return path;
}

/** Prefix an in-app path or public asset for the current Vite base. */
export function withBase(path: string): string {
  const base = getBasePath();
  const [rawPath, query] = path.split('?');
  const pathname = rawPath?.startsWith('/') ? rawPath : `/${rawPath || ''}`;
  const prefixed = pathname === '/' ? `${base}/` : `${base}${pathname}`;
  return query ? `${prefixed}?${query}` : prefixed;
}
