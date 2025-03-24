import { z } from 'zod';
import { YearSeason, BreakType } from '$src/lib/enums/enums';

// Base schema for a surf break
export const breakSchema = z.object({
  id: z.string().optional(), // Optional because it's generated on creation
  name: z.string().min(1, "Break name is required"),
  lat: z.number()
    .refine(val => val >= -90 && val <= 90, {
      message: "Latitude must be between -90 and 90 degrees"
    }),
  lon: z.number()
    .refine(val => val >= -180 && val <= 180, {
      message: "Longitude must be between -180 and 180 degrees"
    }),
  breakType: z.enum(BreakType),
  bestSeason: z.enum(YearSeason),
  // Optional additional fields that could be added in the future
  description: z.string().optional(),
  difficultyLevel: z.number().int().min(1).max(5).optional(),
  swellDirection: z.string().optional(),
  tideCondition: z.string().optional(),
  windDirection: z.string().optional(),
  localRestrictions: z.boolean().optional(),
  hazards: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  imageUrls: z.array(z.string().url()).optional(),
});

// Schema for creating a new break
export const createBreakSchema = breakSchema.omit({ id: true });

// Schema for updating an existing break
export const updateBreakSchema = breakSchema.partial().omit({ id: true });

// Base schema for a region
export const regionSchema = z.object({
  id: z.string().optional(), // Optional because it's generated on creation
  name: z.string().min(1, "Region name is required"),
  // Optional fields that could be added in the future
  description: z.string().optional(),
  coastlineLength: z.number().positive().optional(),
  climate: z.string().optional(),
  localInfo: z.string().optional(),
  travelTips: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

// Schema for creating a new region
export const createRegionSchema = regionSchema.omit({ id: true });

// Schema for updating an existing region
export const updateRegionSchema = regionSchema.partial().omit({ id: true });

// Base schema for a country
export const countrySchema = z.object({
  id: z.string().min(2, "Country ID must be at least 2 characters"),
  name: z.string().min(1, "Country name is required"),
  // Optional fields that could be added in the future
  continent: z.string().optional(),
  language: z.string().optional(),
  currency: z.string().optional(),
  timezone: z.string().optional(),
  visaRequirements: z.string().optional(),
  surfingRegulations: z.string().optional(),
  flagUrl: z.string().url().optional(),
});

// Schema for creating a new country
export const createCountrySchema = countrySchema;

// Schema for updating an existing country
export const updateCountrySchema = countrySchema.partial();

// Expanded schema for returning a complete break with region and country info
export const completeBreakSchema = breakSchema.extend({
  countryId: z.string(),
  countryName: z.string(),
  regionId: z.string(),
  regionName: z.string(),
});

// Schema for searching breaks
export const searchBreaksSchema = z.object({
  name: z.string().optional(),
  breakType: z.enum(BreakType).optional(),
  bestSeason: z.enum(YearSeason).optional(),
  countryId: z.string().optional(),
  regionId: z.string().optional(),
});

// Schema for nearby breaks query
export const nearbyBreaksSchema = z.object({
  lat: z.number()
    .refine(val => val >= -90 && val <= 90, {
      message: "Latitude must be between -90 and 90 degrees"
    }),
  lon: z.number()
    .refine(val => val >= -180 && val <= 180, {
      message: "Longitude must be between -180 and 180 degrees"
    }),
  radiusKm: z.number().positive().default(50),
  limit: z.number().int().positive().optional(),
});

// Schema for the entire breaks data structure
export const breaksDataSchema = z.object({
  countries: z.array(
    countrySchema.extend({
      regions: z.array(
        regionSchema.extend({
          breaks: z.array(breakSchema)
        })
      )
    })
  )
});

// TypeScript Types derived from Zod schemas
export type Break = z.infer<typeof breakSchema>;
export type CreateBreakInput = z.infer<typeof createBreakSchema>;
export type UpdateBreakInput = z.infer<typeof updateBreakSchema>;

export type Region = z.infer<typeof regionSchema> & { breaks: Break[] };
export type CreateRegionInput = z.infer<typeof createRegionSchema>;
export type UpdateRegionInput = z.infer<typeof updateRegionSchema>;

export type Country = z.infer<typeof countrySchema> & { regions: Region[] };
export type CreateCountryInput = z.infer<typeof createCountrySchema>;
export type UpdateCountryInput = z.infer<typeof updateCountrySchema>;

export type CompleteBreak = z.infer<typeof completeBreakSchema>;
export type SearchBreaksParams = z.infer<typeof searchBreaksSchema>;
export type NearbyBreaksParams = z.infer<typeof nearbyBreaksSchema>;
export type BreaksData = z.infer<typeof breaksDataSchema>;