import { users } from "$src/lib/server/db/schemas/users"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const userSelectSchema = createSelectSchema(users)
export const userInsertSchema = createInsertSchema(users)
