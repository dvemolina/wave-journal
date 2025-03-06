import { users } from "$src/lib/server/db/schemas/users"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"


//Extendable drizzle-zod plugin schemas
export const userSelectSchema = createSelectSchema(users)
export const userInsertSchema = createInsertSchema(users)
