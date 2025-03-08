import 'dotenv/config'
import { defineConfig } from 'drizzle-kit';

if(process.env.NODE_EN === 'production' && !process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
} 

export default defineConfig({
	schema: './src/lib/server/db/schemas/drizzle',
	out: './drizzle/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL as string 
	},

	verbose: true,
	strict: true
});
