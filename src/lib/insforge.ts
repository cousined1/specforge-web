import { createClient, type InsForgeClient } from '@insforge/sdk';

let cachedClient: InsForgeClient | null = null;

function getClient(): InsForgeClient {
  if (cachedClient) return cachedClient;
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;
  if (!baseUrl) {
    throw new Error('Missing NEXT_PUBLIC_INSFORGE_URL environment variable');
  }
  if (!anonKey) {
    throw new Error('Missing NEXT_PUBLIC_INSFORGE_ANON_KEY environment variable');
  }
  cachedClient = createClient({ baseUrl, anonKey });
  return cachedClient;
}

export const insforge: InsForgeClient = new Proxy({} as InsForgeClient, {
  get(_target, prop, receiver) {
    const client = getClient();
    return Reflect.get(client as object, prop, receiver);
  },
});
