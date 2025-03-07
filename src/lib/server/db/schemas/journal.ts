import { pgTable, text, timestamp, integer, boolean, uuid } from "drizzle-orm/pg-core";
import { breaks } from "./breaks";
import { CardinalPoints, CrowdSkillLevel, CrowdVolume, CurrentRip, MarineLife, RockDanger, SessionType, TideMovement, VibeInWater, WaterQuality, WaterSurface, WaveCharacter, WaveFrequency, WaveHeight, WavePeeling, WavePeelSpeed, WaveShallowness, WaveSteepness, WaveWallShape, WindConsistency, WindStrength } from "../enums";

export const journalEntries = pgTable("journal_entries", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "journal_entry_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    uuid: uuid("uuid").notNull().unique(), // Offline-safe unique ID
    type: text("type", { enum: SessionType }).notNull(), 
    breakId: integer("break_id").notNull().references((() => breaks.id)),
    date: timestamp("date").notNull(),
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),
    syncedAt: timestamp("synced_at"), // Null if still offline
});

export const waveConditions = pgTable("wave_conditions", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "wave_conditions_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    height: text("height", { enum: WaveHeight }).notNull(),
    frequency: text("frequency", { enum: WaveFrequency }).notNull(),
    character: text("character", { enum: WaveCharacter}).notNull(),           
    tideMovement: text("tide_movement", { enum:  TideMovement }).notNull(),
    peelDirection: text("peel_direction", { enum: WavePeeling }).notNull(), 
    wallShape: text("wave_wall_shape", { enum: WaveWallShape }).notNull(),         
    peelSpeed: text("peel_speed", { enum: WavePeelSpeed }).notNull(),        
    steepness: text("steepness", { enum: WaveSteepness }).notNull(),
    shallowness: text("shallowness", { enum: WaveShallowness }).notNull(),         
});

export const windConditions = pgTable("wind_conditions", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "wind_conditions_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    direction: text("direction", { enum: CardinalPoints }).notNull(),
    consistency: text("consistency", { enum: WindConsistency }).notNull(),  
    strength: text("strength", { enum: WindStrength }).notNull()
});

export const environmentConditions = pgTable("environment_conditions", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "environment:conditions_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    current: text("current", { enum: CurrentRip }).notNull(),
    rockDanger: text("rock_danger", { enum: RockDanger }).notNull(),
    waterQuality: text("water_quality", { enum: WaterQuality }).notNull(),
    waterSurface: text("water_surface", { enum: WaterSurface }).notNull(),   
});

export const marineLife = pgTable("marine_life", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "marine_life_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    species: text("species", { enum: MarineLife }).notNull()
});

export const crowdConditions = pgTable("crowd_conditions", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "crowd_conditions_id", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    vibe: text("vibe", { enum: VibeInWater }).notNull(),
    volume: text("volume", { enum: CrowdVolume }).notNull(),
    skillLevel: text("skill_level", { enum: CrowdSkillLevel }).notNull()
});

export const gearUsed = pgTable("gear_used", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "gear_used_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    boardId: integer("boardId").notNull(),
    wetsuitThickness: text("wetsuit_thickness"),
    gloves: boolean("gloves").notNull().default(false),
    boots: boolean("boots").notNull().default(false),
    hood: boolean("hood").notNull().default(false)
});

export const personalPerformance = pgTable("personal_performance", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "personal_performance_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    performanceRating: integer("performance_rating").notNull(),
    feeling: text("feeling").notNull(),
    comments: text("comments")
});

export const challengesFaced = pgTable("challenges_faced", {
    id: integer('id').generatedAlwaysAsIdentity({ name: "challenges_faced_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    journalEntryId: integer("journal_entry_id").notNull().references(() => journalEntries.id, { onDelete: "cascade" }),
    challenge: text("challenge").notNull()
});
