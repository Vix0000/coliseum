export type HomeVersion = 'v1' | 'v2';

export const DEFAULT_HOME_VERSION: HomeVersion = 'v2';

export function parseHomeVersion(raw: unknown): HomeVersion {
  return raw === 'v1' ? 'v1' : 'v2';
}
