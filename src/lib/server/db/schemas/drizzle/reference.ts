import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable("languages", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: 'languages_id_sequence', startWith: 1, increment: 1 }),
    language: varchar("language", { length: 100 }).notNull(),
    code: varchar("code", { length:6 }).notNull().unique(), //AA-aa format
  });

export const countries = pgTable("countries", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: 'countries_id_sequence', startWith: 1, increment: 1 }),
    country: varchar("country", { length: 100 }).notNull(),
    code: varchar("code", { length: 2 }).notNull().unique(), //AA format
});

export const regions = pgTable("regions", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: 'regions_id_sequence', startWith: 1, increment: 1 }),
    countryId: integer("country_id").notNull().references(() => countries.id),
    region: varchar("region", { length: 100 }).notNull(),
})

export const currencies = pgTable("currencies", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: 'currencies_id_sequence', startWith: 1, increment: 1 }),
    currency: varchar('currency', { length: 50 }).notNull(),
    code: varchar('code', {length: 3}).notNull().unique()
})

export const roles = pgTable('roles', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'roles_id_sequence', startWith: 1, increment: 1 }),
    role: varchar('role', { length: 50 }).notNull().unique(), 
});