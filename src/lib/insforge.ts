import { createClient } from '@insforge/sdk';

const baseUrl = process.env.INSFORGE_URL || 'http://localhost:7130';

export const insforge = createClient({
  baseUrl,
  isServerMode: true,
});
