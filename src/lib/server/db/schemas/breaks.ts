import { pgTable, integer, uuid, text, real } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { users } from "./users";

export const breaks = pgTable("breaks", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "breaks_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(), // Internal numeric ID
    publicId: uuid("public_id").defaultRandom().notNull().unique(), // External UUID
    name: text("name").notNull().unique(), // Spot name
    region: text("region").notNull(), 
    country: text("country"), // Optional: Extract country from region if needed
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    breakType: text("break_type").notNull(), // Point, Reef, Beach, RiverMouth, River, Artificial, Lake
    bestSeason: text("best_season").notNull(), // E.g., "Winter"
    rating: integer("rating").notNull(), // Numeric rating (converted from string)
    description: text("description"), // Optional: Add more info about the spot
    ...timestamps,
    createdBy: integer("created_by").notNull().references(() => users.id)
});