import type { ZodSchema } from 'zod';
import { 
    breakSchema, 
    createBreakSchema, 
    updateBreakSchema,
    regionSchema,
    createRegionSchema,
    updateRegionSchema,
    countrySchema,
    createCountrySchema,
    updateCountrySchema,
    searchBreaksSchema,
    nearbyBreaksSchema,
    breaksDataSchema,
    type CreateBreakInput,
    type UpdateBreakInput,
    type CreateRegionInput,
    type UpdateRegionInput,
    type CreateCountryInput,
    type UpdateCountryInput,
    type SearchBreaksParams,
    type NearbyBreaksParams
  } from './schemas';
  
  /**
   * Validates a break input against the schema
   * @param data The break data to validate
   * @returns Validated data or throws a validation error
   */
  export function validateBreak(data: unknown) {
    return breakSchema.parse(data);
  }
  
  /**
   * Validates input for creating a new break
   * @param data The break creation data
   * @returns Validated data or throws a validation error
   */
  export function validateCreateBreak(data: unknown): CreateBreakInput {
    return createBreakSchema.parse(data);
  }
  
  /**
   * Validates input for updating a break
   * @param data The break update data
   * @returns Validated data or throws a validation error
   */
  export function validateUpdateBreak(data: unknown): UpdateBreakInput {
    return updateBreakSchema.parse(data);
  }
  
  /**
   * Validates a region input against the schema
   * @param data The region data to validate
   * @returns Validated data or throws a validation error
   */
  export function validateRegion(data: unknown) {
    return regionSchema.parse(data);
  }
  
  /**
   * Validates input for creating a new region
   * @param data The region creation data
   * @returns Validated data or throws a validation error
   */
  export function validateCreateRegion(data: unknown): CreateRegionInput {
    return createRegionSchema.parse(data);
  }
  
  /**
   * Validates input for updating a region
   * @param data The region update data
   * @returns Validated data or throws a validation error
   */
  export function validateUpdateRegion(data: unknown): UpdateRegionInput {
    return updateRegionSchema.parse(data);
  }
  
  /**
   * Validates a country input against the schema
   * @param data The country data to validate
   * @returns Validated data or throws a validation error
   */
  export function validateCountry(data: unknown) {
    return countrySchema.parse(data);
  }
  
  /**
   * Validates input for creating a new country
   * @param data The country creation data
   * @returns Validated data or throws a validation error
   */
  export function validateCreateCountry(data: unknown): CreateCountryInput {
    return createCountrySchema.parse(data);
  }
  
  /**
   * Validates input for updating a country
   * @param data The country update data
   * @returns Validated data or throws a validation error
   */
  export function validateUpdateCountry(data: unknown): UpdateCountryInput {
    return updateCountrySchema.parse(data);
  }
  
  /**
   * Validates search parameters for breaks
   * @param data The search parameters
   * @returns Validated data or throws a validation error
   */
  export function validateSearchBreaksParams(data: unknown): SearchBreaksParams {
    return searchBreaksSchema.parse(data);
  }
  
  /**
   * Validates parameters for finding nearby breaks
   * @param data The nearby parameters
   * @returns Validated data or throws a validation error
   */
  export function validateNearbyBreaksParams(data: unknown): NearbyBreaksParams {
    return nearbyBreaksSchema.parse(data);
  }
  
  /**
   * Validates the entire breaks data structure
   * @param data The complete breaks data
   * @returns Validated data or throws a validation error
   */
  export function validateBreaksData(data: unknown) {
    return breaksDataSchema.parse(data);
  }
  
  /**
   * Safe version of validation that returns an object with success flag
   * @param schema The Zod schema to validate against
   * @param data The data to validate
   * @returns Object with success flag and data or error
   */
  export function safeValidate<T>(schema: ZodSchema, data: unknown): { success: boolean; data?: T; error?: string } {
    try {
      const validatedData = schema.parse(data);
      return {
        success: true,
        data: validatedData
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Validation failed'
      };
    }
  }