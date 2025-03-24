import type { SurfBreakSchema } from "./validations";


export class BreaksRepository {

    /**
     * Adds a new Surf Break with all its related data
     * @param breakData The validated surf break data
     * @param userId The ID of the user adding the break
     * @returns The surf break added with all related data
     */

    async addSurfBreak(breakData: SurfBreakSchema, userId: number)
}