// Database connection - temporarily disabled for static build
// Will be enabled when DATABASE_URL is available in production

export const prisma = {
  chatMessage: {
    create: async (data: any) => console.log('DB create:', data),
    findMany: async (query: any) => [],
  },
  lead: {
    create: async (data: any) => console.log('Lead create:', data),
  },
};
