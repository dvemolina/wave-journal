import { db } from "$src/lib/server/db";
import { 
  journalEntries, 
  waveConditions, 
  windConditions, 
  environmentConditions, 
  marineLife, 
  crowdConditions, 
  gearUsed, 
  personalPerformance, 
  challengesFaced 
} from "$src/lib/server/db/schemas/journal";
import type { JournalEntrySchema } from "$src/features/Journal/lib/validations";

export class JournalRepository {
  /**
   * Adds a new journal entry with all its related data
   * @param journalEntryData The validated journal entry data
   * @param authorId The ID of the user creating the entry
   * @returns The created journal entry with all related data
   */
  async addJournalEntry(journalEntryData: JournalEntrySchema, authorId: number) {
    try {
      // Start the transaction to ensure data integrity across tables
      const result = await db.transaction(async (trx) => {
        // Insert into journal_entries first and get the inserted ID
        const [journalEntry] = await trx.insert(journalEntries)
          .values({
            uuid: journalEntryData.entryDetails.uuid, // Unique ID for offline-first capability
            sessionType: journalEntryData.entryDetails.sessionType,
            authorId: authorId,
            breakId: journalEntryData.entryDetails.breakId,
            date: journalEntryData.entryDetails.date,
            startTime: journalEntryData.entryDetails.startTime,
            endTime: journalEntryData.entryDetails.endTime
          })
          .returning({ id: journalEntries.id });

        const journalEntryId = journalEntry.id;

        // Insert wave conditions
        await trx.insert(waveConditions).values({
          journalEntryId,
          height: journalEntryData.waveConditions.height,
          frequency: journalEntryData.waveConditions.frequency,
          character: journalEntryData.waveConditions.character,
          tideMovement: journalEntryData.waveConditions.tideMovement,
          peelDirection: journalEntryData.waveConditions.peelDirection,
          wallShape: journalEntryData.waveConditions.wallShape,
          peelSpeed: journalEntryData.waveConditions.peelSpeed,
          steepness: journalEntryData.waveConditions.steepness,
          shallowness: journalEntryData.waveConditions.shallowness,
        });

        // Insert wind conditions
        await trx.insert(windConditions).values({
          journalEntryId,
          direction: journalEntryData.windConditions.direction,
          consistency: journalEntryData.windConditions.consistency,
          strength: journalEntryData.windConditions.strength,
        });

        // Insert environment conditions
        await trx.insert(environmentConditions).values({
          journalEntryId,
          current: journalEntryData.environmentConditions.current,
          rockDanger: journalEntryData.environmentConditions.rockDanger,
          waterQuality: journalEntryData.environmentConditions.waterQuality,
          waterSurface: journalEntryData.environmentConditions.waterSurface,
        });

        // Insert marine life observations (if any)
        if (journalEntryData.marineLife.species.length > 0) {
          await trx.insert(marineLife).values(
            journalEntryData.marineLife.species.map(species => ({ 
              journalEntryId, 
              species 
            }))
          );
        }

        // Insert crowd conditions
        await trx.insert(crowdConditions).values({
          journalEntryId,
          vibe: journalEntryData.crowdConditions.vibe,
          volume: journalEntryData.crowdConditions.volume,
          skillLevel: journalEntryData.crowdConditions.skillLevel,
        });

        // Insert gear used
        await trx.insert(gearUsed).values({
          journalEntryId,
          boardId: journalEntryData.gearUsed.boardId,
          wetsuitThickness: journalEntryData.gearUsed.wetsuitThickness,
          gloves: journalEntryData.gearUsed.gloves,
          boots: journalEntryData.gearUsed.boots,
          hood: journalEntryData.gearUsed.hood,
        });

        // Insert personal performance
        await trx.insert(personalPerformance).values({
          journalEntryId,
          performanceRating: journalEntryData.personalPerformance.performanceRating,
          feeling: journalEntryData.personalPerformance.feeling,
          comments: journalEntryData.personalPerformance.comments,
        });

        // Insert challenges faced (if any)
        if (journalEntryData.challengesFaced.challenge.length > 0) {
          await trx.insert(challengesFaced).values(
            journalEntryData.challengesFaced.challenge.map(challenge => ({ 
              journalEntryId, 
              challenge 
            }))
          );
        }

        // Return the complete entry with ID
        return {
          id: journalEntryId,
          uuid: journalEntryData.entryDetails.uuid,
          authorId,
          sessionType: journalEntryData.entryDetails.sessionType,
          breakId: journalEntryData.entryDetails.breakId,
          date: journalEntryData.entryDetails.date,
          startTime: journalEntryData.entryDetails.startTime,
          endTime: journalEntryData.entryDetails.endTime,
          syncedAt: journalEntryData.entryDetails.syncedAt,
          waveConditions: journalEntryData.waveConditions,
          windConditions: journalEntryData.windConditions,
          environmentConditions: journalEntryData.environmentConditions,
          marineLife: journalEntryData.marineLife,
          crowdConditions: journalEntryData.crowdConditions,
          gearUsed: journalEntryData.gearUsed,
          personalPerformance: journalEntryData.personalPerformance,
          challengesFaced: journalEntryData.challengesFaced,
        };
      });

      return result;
    } catch (error) {
      console.error("Repository error inserting journal entry:", error);
      throw new Error(`Failed to add journal entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Retrieves a journal entry by its ID with all related data
   * @param journalEntryId The journal entry ID
   * @param authorId The ID of the user requesting the entry (for authorization)
   * @returns The complete journal entry with all related data
   */
  async getJournalEntryById(journalEntryId: number, authorId: number) {
    try {
      // For future implementation - stub for now
      throw new Error("Method not implemented");
    } catch (error) {
      console.error("Repository error retrieving journal entry:", error);
      throw new Error(`Failed to retrieve journal entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Lists journal entries for a specific user with pagination
   * @param authorId The ID of the user
   * @param limit Maximum number of entries to return (for pagination)
   * @param offset Number of entries to skip (for pagination)
   * @returns Array of journal entries with basic information
   */
  async listJournalEntriesByUser(authorId: number, limit: number = 10, offset: number = 0) {
    try {
      // For future implementation - stub for now
      throw new Error("Method not implemented");
    } catch (error) {
      console.error("Repository error listing journal entries:", error);
      throw new Error(`Failed to list journal entries: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Updates an existing journal entry and all its related data
   * @param journalEntryId The journal entry ID
   * @param journalEntryData The updated journal entry data
   * @param authorId The ID of the user updating the entry (for authorization)
   * @returns The updated journal entry with all related data
   */
  async updateJournalEntry(journalEntryId: number, journalEntryData: JournalEntrySchema, authorId: number) {
    try {
      // For future implementation - stub for now
      throw new Error("Method not implemented");
    } catch (error) {
      console.error("Repository error updating journal entry:", error);
      throw new Error(`Failed to update journal entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Deletes a journal entry and all its related data
   * @param journalEntryId The journal entry ID
   * @param authorId The ID of the user deleting the entry (for authorization)
   * @returns Boolean indicating success
   */
  async deleteJournalEntry(journalEntryId: number, authorId: number) {
    try {
      // For future implementation - stub for now
      throw new Error("Method not implemented");
    } catch (error) {
      console.error("Repository error deleting journal entry:", error);
      throw new Error(`Failed to delete journal entry: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}