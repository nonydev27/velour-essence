import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // Explicitly forces Node to load your .env file variables

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL, // Required for Prisma migrations through Supabase pooler
  },
});