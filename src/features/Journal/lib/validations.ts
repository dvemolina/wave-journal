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
  WindDirection,
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

// Unified Journal Entry Schema
export const journalEntrySchema = z.object({
  entryDetails: z.object({
    uuid: z.string().uuid().optional(),
    sessionType: z.enum(SessionType),
    breakId: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),  // Validate YYYY-MM-DD format
    startTime: z.string(),
    endTime: z.string(),
    syncedAt: z.date().optional(),
  }),
  
  waveConditions: z.object({
    height: z.enum(WaveHeight),
    frequency: z.enum(WaveFrequency),
    character: z.enum(WaveCharacter),
    tideMovement: z.enum(TideMovement),
    peelDirection: z.enum(WavePeeling),
    wallShape: z.enum(WaveWallShape),
    peelSpeed: z.enum(WavePeelSpeed),
    steepness: z.enum(WaveSteepness),
    shallowness: z.enum(WaveShallowness),
  }),

  windConditions: z.object({
    direction: z.enum(WindDirection),
    consistency: z.enum(WindConsistency),
    strength: z.enum(WindStrength),
  }),

  environmentConditions: z.object({
    current: z.enum(CurrentRip),
    rockDanger: z.enum(RockDanger),
    waterQuality: z.enum(WaterQuality),
    waterSurface: z.enum(WaterSurface),
  }),

  marineLife: z.object({
    species: z.array(z.enum(MarineLife)),
  }),

  crowdConditions: z.object({
    vibe: z.enum(VibeInWater),
    volume: z.enum(CrowdVolume),
    skillLevel: z.enum(CrowdSkillLevel),
  }),

  gearUsed: z.object({
    boardId: z.number().int(),
    wetsuitThickness: z.string().optional(),
    gloves: z.boolean(),
    boots: z.boolean(),
    hood: z.boolean(),
  }),

  personalPerformance: z.object({
    performanceRating: z.number().int(),
    feeling: z.enum(OverallFeeling),
    comments: z.string().optional(),
  }),

  challengesFaced: z.object({
    challenge: z.array(z.enum(FacedChallenges)),
  }),
});

// Unified Validation Type 
export type JournalEntrySchema = z.infer<typeof journalEntrySchema>;
