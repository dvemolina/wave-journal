import { pgTable, text, integer, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers';

export const user = pgTable('user', {
	id: integer('id').generatedAlwaysAsIdentity({ name: "users_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull(),
	name: text('name').notNull(),
	surname: text('surname'),
	age: integer('age'),
	phone: varchar('phone',{ length: 19 }),
	googleId: varchar('google_id').unique(),
	password: varchar('password', {length: 255}),
	profileImage: varchar('profile_image', {length: 255}).default('/favicon.png').notNull(),
	isVerified: boolean('is_verified').notNull().default(false),
	acceptedTerms: boolean('accepted_terms').notNull().default(false),
	...timestamps
});


export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
