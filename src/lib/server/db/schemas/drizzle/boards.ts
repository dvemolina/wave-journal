import { integer, pgTable } from "drizzle-orm/pg-core";

export const boards = pgTable("boards", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "boards_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
});