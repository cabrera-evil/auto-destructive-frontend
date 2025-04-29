'server-only';

import { create } from '@/lib/rest';

export async function verifySession(token: string | undefined) {
  return token ? create({ path: '/auth/profile', token }) : null;
}
