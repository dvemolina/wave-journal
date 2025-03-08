
//Work-around for Sveltekit's server-side code imports limitation 
import { z } from 'zod';
import { 
  SessionType, 
  WaveHeight, 
  WaveFrequency, 
  WaveCharacter, 
  TideMovement, 
  WavePeeling, 
  WaveWallShape, 
  WavePeelSpeed, 
  WaveSteepness, 
  WaveShallowness, 
  CardinalPoints, 
  WindConsistency, 
  WindStrength, 
  CurrentRip, 
  RockDanger, 
  WaterQuality, 
  WaterSurface, 
  MarineLife, 
  VibeInWater, 
  CrowdVolume, 
  CrowdSkillLevel, 
  OverallFeeling, 
  FacedChallenges 
} from '$lib/enums/enums';

// Journal Entry Schema
export const entryDetailsSchema = z.object({
  uuid: z.string().uuid(),
  sessionType: z.enum(SessionType),
  breakId: z.number().int(),
  date: z.string(),  // You may want to further refine this for date validation
  startTime: z.string(),
  endTime: z.string(),
  syncedAt: z.string().optional(),
});

// Wave Conditions Schema
export const waveConditionsSchema = z.object({
  journalEntryId: z.number().int(),
  height: z.enum(WaveHeight),
  frequency: z.enum(WaveFrequency),
  character: z.enum(WaveCharacter),
  tideMovement: z.enum(TideMovement),
  peelDirection: z.enum(WavePeeling),
  wallShape: z.enum(WaveWallShape),
  peelSpeed: z.enum(WavePeelSpeed),
  steepness: z.enum(WaveSteepness),
  shallowness: z.enum(WaveShallowness),
});

// Wind Conditions Schema
export const windConditionsSchema = z.object({
  journalEntryId: z.number().int(),
  direction: z.enum(CardinalPoints),
  consistency: z.enum(WindConsistency),
  strength: z.enum(WindStrength),
});

// Environment Conditions Schema
export const environmentConditionsSchema = z.object({
  journalEntryId: z.number().int(),
  current: z.enum(CurrentRip),
  rockDanger: z.enum(RockDanger),
  waterQuality: z.enum(WaterQuality),
  waterSurface: z.enum(WaterSurface),
});

// Marine Life Schema
export const marineLifeSchema = z.object({
  journalEntryId: z.number().int(),
  species: z.enum(MarineLife),
});

// Crowd Conditions Schema
export const crowdConditionsSchema = z.object({
  journalEntryId: z.number().int(),
  vibe: z.enum(VibeInWater),
  volume: z.enum(CrowdVolume),
  skillLevel: z.enum(CrowdSkillLevel),
});

// Gear Used Schema
export const gearUsedSchema = z.object({
  journalEntryId: z.number().int(),
  boardId: z.number().int(),
  wetsuitThickness: z.string().optional(),
  gloves: z.boolean(),
  boots: z.boolean(),
  hood: z.boolean(),
});

// Personal Performance Schema
export const personalPerformanceSchema = z.object({
  journalEntryId: z.number().int(),
  performanceRating: z.number().int(),
  feeling: z.enum(OverallFeeling),
  comments: z.string().optional(),
});

// Challenges Faced Schema
export const challengesFacedSchema = z.object({
  journalEntryId: z.number().int(),
  challenge: z.enum(FacedChallenges),
});

// Full Journal Entry Schema (with related tables)
export const journalEntrySchema = z.object({
  entryDetails: entryDetailsSchema,
  waveConditions: z.array(waveConditionsSchema),
  windConditions: z.array(windConditionsSchema),
  environmentConditions: z.array(environmentConditionsSchema),
  marineLife: z.array(marineLifeSchema),
  crowdConditions: z.array(crowdConditionsSchema),
  gearUsed: z.array(gearUsedSchema),
  personalPerformance: z.array(personalPerformanceSchema),
  challengesFaced: z.array(challengesFacedSchema),
});

export type JournalEntrySchema = typeof journalEntrySchema;

