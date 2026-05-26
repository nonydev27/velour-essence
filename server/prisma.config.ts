import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // Explicitly forces Node to load your .env file variables

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});