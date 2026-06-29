import { PrismaClient } from '@prisma/client'

import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let dbUrl = process.env.DATABASE_URL;

// Fix for local Next.js dev server SQLite resolution
if (process.env.NODE_ENV !== 'production' && (!dbUrl || dbUrl.startsWith('file:'))) {
  dbUrl = `file:${path.join(process.cwd(), 'db', 'custom.db')}`;
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    ...(dbUrl ? { datasources: { db: { url: dbUrl } } } : {}),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db