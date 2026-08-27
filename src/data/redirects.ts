export interface RedirectRule {
  from: string;
  to: string;
}

export const LEGACY_REDIRECTS: RedirectRule[] = [
  { from: '/driveways-interlock-2', to: '/services/interlock' },
  { from: '/patios-stamped', to: '/services/stamped-concrete' },
  { from: '/stairs-porches-concrete', to: '/services/concrete-stairs' },
  { from: '/patios', to: '/services/concrete-patios' },
  { from: '/interlock', to: '/services/interlock' },
  { from: '/stamped-concrete-ottawa', to: '/services/stamped-concrete' },
  { from: '/interlock-ottawa', to: '/services/interlock' },
  { from: '/concrete-driveways-ottawa', to: '/services/concrete-driveways' },
  { from: '/concrete-patios-ottawa', to: '/services/concrete-patios' },
];

export function normalizePath(path: string): string {
  const pathname = (path.split('?')[0] || '/').trim() || '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function matchRedirect(path: string): RedirectRule | undefined {
  const normalized = normalizePath(path);
  return LEGACY_REDIRECTS.find((rule) => normalizePath(rule.from) === normalized);
}
