export type HomeVersion = 'v1' | 'v2';

export const DEFAULT_HOME_VERSION: HomeVersion = 'v1';

export function parseHomeVersion(raw: unknown): HomeVersion {
  return raw === 'v2' ? 'v2' : 'v1';
}
