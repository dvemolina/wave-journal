import { challengesFaced, crowdConditions, environmentConditions, gearUsed, journalEntries, marineLife, personalPerformance, waveConditions, windConditions } from "$src/lib/server/db/schemas/journal"
import { createInsertSchema } from "drizzle-zod"
import { z } from 'zod'

export const entryDetailsSchema = createInsertSchema(journalEntries);
export const waveConditionsSchema = createInsertSchema(waveConditions);
export const windConditionsSchema = createInsertSchema(waveConditions);
export const environmentConditionsSchema = createInsertSchema(environmentConditions);
export const marineLifeSchema = createInsertSchema(marineLife);
export const crowdConditionsSchema = createInsertSchema(crowdConditions);
export const gearUsedSchema = createInsertSchema(gearUsed);
export const personalPerformanceSchema = createInsertSchema(personalPerformance);
export const challengesFacedSchema = createInsertSchema(challengesFaced);

export const journalEntrySchema = z.object({
    entryDetails: entryDetailsSchema,
    waveConditions: waveConditionsSchema,
    windConditions: windConditionsSchema,
    environmentConditions: environmentConditionsSchema,
    marineLife: marineLifeSchema,
    crowdConditions:  crowdConditionsSchema,
    gearUsed: gearUsedSchema,
    personalPerformance: personalPerformanceSchema,
    challengesFaced: challengesFacedSchema
});

export type JournalEntrySchema = typeof journalEntrySchema;