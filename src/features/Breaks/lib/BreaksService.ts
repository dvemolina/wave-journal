import { BreaksRepository } from './BreaksRepository';
import { 
  safeValidate
} from './validations/validators';
import {
  createCountrySchema,
  updateCountrySchema,
  createRegionSchema,
  updateRegionSchema,
  createBreakSchema,
  updateBreakSchema,

} from './validations/schemas';
import type {  
  Break, 
  CreateCountryInput, 
  UpdateCountryInput,
  CreateRegionInput, 
  UpdateRegionInput,
  CreateBreakInput, 
  UpdateBreakInput,
} from './validations/schemas';

export class BreaksService {
  private breaksRepository: BreaksRepository;
  
  constructor(filePath?: string) {
    this.breaksRepository = new BreaksRepository(filePath);
  }
  
  /**
   * Gets all countries with their regions and breaks
   * @returns All countries with their regions and breaks
   */
  async getAllCountries() {
    try {
      const countries = await this.breaksRepository.getAllCountries();
      return {
        success: true,
        data: countries
      };
    } catch (error) {
      console.error("Error in BreaksService.getAllCountries:", error);
      return {
        success: false,
        error: "Failed to get countries"
      };
    }
  }
  
  /**
   * Gets a country by its ID
   * @param countryId The country ID
   * @returns The country if found
   */
  async getCountryById(countryId: string) {
    try {
      const country = await this.breaksRepository.getCountryById(countryId);
      
      if (!country) {
        return {
          success: false,
          error: `Country with ID ${countryId} not found`
        };
      }
      
      return {
        success: true,
        data: country
      };
    } catch (error) {
      console.error(`Error in BreaksService.getCountryById for ID ${countryId}:`, error);
      return {
        success: false,
        error: "Failed to get country"
      };
    }
  }
  
  /**
   * Gets all regions for a country
   * @param countryId The country ID
   * @returns The regions for the country
   */
  async getRegionsByCountryId(countryId: string) {
    try {
      const regions = await this.breaksRepository.getRegionsByCountryId(countryId);
      
      return {
        success: true,
        data: regions
      };
    } catch (error) {
      console.error(`Error in BreaksService.getRegionsByCountryId for country ID ${countryId}:`, error);
      return {
        success: false,
        error: "Failed to get regions"
      };
    }
  }
  
  /**
   * Gets a region by its ID
   * @param countryId The country ID
   * @param regionId The region ID
   * @returns The region if found
   */
  async getRegionById(countryId: string, regionId: string) {
    try {
      const region = await this.breaksRepository.getRegionById(countryId, regionId);
      
      if (!region) {
        return {
          success: false,
          error: `Region with ID ${regionId} not found in country ${countryId}`
        };
      }
      
      return {
        success: true,
        data: region
      };
    } catch (error) {
      console.error(`Error in BreaksService.getRegionById for region ID ${regionId}:`, error);
      return {
        success: false,
        error: "Failed to get region"
      };
    }
  }
  
  /**
   * Gets all breaks for a region
   * @param countryId The country ID
   * @param regionId The region ID
   * @returns The breaks for the region
   */
  async getBreaksByRegionId(countryId: string, regionId: string) {
    try {
      const breaks = await this.breaksRepository.getBreaksByRegionId(countryId, regionId);
      
      return {
        success: true,
        data: breaks
      };
    } catch (error) {
      console.error(`Error in BreaksService.getBreaksByRegionId for region ID ${regionId}:`, error);
      return {
        success: false,
        error: "Failed to get breaks"
      };
    }
  }
  
  /**
   * Gets a break by its ID
   * @param breakId The break ID
   * @returns The break if found
   */
  async getBreakById(breakId: string) {
    try {
      const surfBreak = await this.breaksRepository.getBreakById(breakId);
      
      if (!surfBreak) {
        return {
          success: false,
          error: `Break with ID ${breakId} not found`
        };
      }
      
      return {
        success: true,
        data: surfBreak
      };
    } catch (error) {
      console.error(`Error in BreaksService.getBreakById for break ID ${breakId}:`, error);
      return {
        success: false,
        error: "Failed to get break"
      };
    }
  }
  
  /**
   * Creates a new country
   * @param countryData The country data
   * @returns The created country
   */
  async createCountry(countryData: unknown) {
    try {
      // Validate input data
      const validation = safeValidate<CreateCountryInput>(createCountrySchema, countryData);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid country data: ${validation.error}`
        };
      }
      
      const validatedData = validation.data!;
      
      // Format country ID (lowercase, hyphenated)
      const formattedId = validatedData.id.toLowerCase().replace(/\s+/g, '-');
      
      const country = await this.breaksRepository.addCountry({
        id: formattedId,
        name: validatedData.name
      });
      
      return {
        success: true,
        data: country
      };
    } catch (error) {
      console.error("Error in BreaksService.createCountry:", error);
      const errorMessage = error instanceof Error && error.message.includes("already exists") 
        ? error.message 
        : "Failed to create country";
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Creates a new region in a country
   * @param countryId The country ID
   * @param regionData The region data
   * @returns The created region
   */
  async createRegion(countryId: string, regionData: unknown) {
    try {
      // Validate input data
      const validation = safeValidate<CreateRegionInput>(createRegionSchema, regionData);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid region data: ${validation.error}`
        };
      }
      
      const validatedData = validation.data!;
      
      // Check if country exists
      const country = await this.breaksRepository.getCountryById(countryId);
      if (!country) {
        return {
          success: false,
          error: `Country with ID ${countryId} not found`
        };
      }
      
      // Generate region ID
      const regionId = `${countryId}-${validatedData.name.toLowerCase().replace(/\s+/g, '_')}`;
      
      const region = await this.breaksRepository.addRegion(countryId, {
        id: regionId,
        name: validatedData.name,
        description: validatedData.description
      });
      
      return {
        success: true,
        data: region
      };
    } catch (error) {
      console.error(`Error in BreaksService.createRegion for country ${countryId}:`, error);
      const errorMessage = error instanceof Error && error.message.includes("already exists") 
        ? error.message 
        : "Failed to create region";
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Creates a new break in a region
   * @param countryId The country ID
   * @param regionId The region ID
   * @param breakData The break data
   * @returns The created break
   */
  async createBreak(countryId: string, regionId: string, breakData: unknown) {
    try {
      // Validate input data
      const validation = safeValidate<CreateBreakInput>(createBreakSchema, breakData);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid break data: ${validation.error}`
        };
      }
      
      const validatedData = validation.data!;
      
      // Check if region exists
      const region = await this.breaksRepository.getRegionById(countryId, regionId);
      if (!region) {
        return {
          success: false,
          error: `Region with ID ${regionId} not found in country ${countryId}`
        };
      }
      
      // Generate break ID
      const breakId = `${regionId}-${validatedData.name.toLowerCase().replace(/\s+/g, '_')}`;
      
      const newBreak = await this.breaksRepository.addBreak(countryId, regionId, {
        id: breakId,
        name: validatedData.name,
        lat: validatedData.lat,
        lon: validatedData.lon,
        breakType: validatedData.breakType,
        bestSeason: validatedData.bestSeason,
        description: validatedData.description,
        difficultyLevel: validatedData.difficultyLevel,
        swellDirection: validatedData.swellDirection,
        tideCondition: validatedData.tideCondition,
        windDirection: validatedData.windDirection,
        localRestrictions: validatedData.localRestrictions,
        hazards: validatedData.hazards,
        facilities: validatedData.facilities,
        imageUrls: validatedData.imageUrls
      });
      
      return {
        success: true,
        data: newBreak
      };
    } catch (error) {
      console.error(`Error in BreaksService.createBreak for region ${regionId}:`, error);
      const errorMessage = error instanceof Error && error.message.includes("already exists") 
        ? error.message 
        : "Failed to create break";
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Updates an existing country
   * @param countryId The country ID to update
   * @param countryData The updated country data
   * @returns The updated country
   */
  async updateCountry(countryId: string, countryData: unknown) {
    try {
      // Validate input data
      const validation = safeValidate<UpdateCountryInput>(updateCountrySchema, countryData);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid country update data: ${validation.error}`
        };
      }
      
      const validatedData = validation.data!;
      
      // Check if country exists
      const existingCountry = await this.breaksRepository.getCountryById(countryId);
      if (!existingCountry) {
        return {
          success: false,
          error: `Country with ID ${countryId} not found`
        };
      }
      
      // Prepare update data, keeping existing values if not provided
      const updateData = {
        id: countryId, // ID shouldn't change
        name: validatedData.name || existingCountry.name,
        // Include optional fields
        continent: validatedData.continent ?? existingCountry.continent,
        language: validatedData.language ?? existingCountry.language,
        currency: validatedData.currency ?? existingCountry.currency,
        timezone: validatedData.timezone ?? existingCountry.timezone,
        visaRequirements: validatedData.visaRequirements ?? existingCountry.visaRequirements,
        surfingRegulations: validatedData.surfingRegulations ?? existingCountry.surfingRegulations,
        flagUrl: validatedData.flagUrl ?? existingCountry.flagUrl
      };
      
      const updatedCountry = await this.breaksRepository.updateCountry(countryId, updateData);
      
      return {
        success: true,
        data: updatedCountry
      };
    } catch (error) {
      console.error(`Error in BreaksService.updateCountry for country ${countryId}:`, error);
      return {
        success: false,
        error: "Failed to update country"
      };
    }
  }
  
  /**
   * Updates an existing region
   * @param countryId The country ID
   * @param regionId The region ID to update
   * @param regionData The updated region data
   * @returns The updated region
   */
  async updateRegion(countryId: string, regionId: string, regionData: unknown) {
    try {
      // Validate input data
      const validation = safeValidate<UpdateRegionInput>(updateRegionSchema, regionData);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid region update data: ${validation.error}`
        };
      }
      
      const validatedData = validation.data!;
      
      // Check if region exists
      const existingRegion = await this.breaksRepository.getRegionById(countryId, regionId);
      if (!existingRegion) {
        return {
          success: false,
          error: `Region with ID ${regionId} not found in country ${countryId}`
        };
      }
      
      // Prepare update data, keeping existing values if not provided
      const updateData = {
        id: regionId, // ID shouldn't change
        name: validatedData.name || existingRegion.name,
        // Include optional fields
        description: validatedData.description ?? existingRegion.description,
        coastlineLength: validatedData.coastlineLength ?? existingRegion.coastlineLength,
        climate: validatedData.climate ?? existingRegion.climate,
        localInfo: validatedData.localInfo ?? existingRegion.localInfo,
        travelTips: validatedData.travelTips ?? existingRegion.travelTips,
        imageUrl: validatedData.imageUrl ?? existingRegion.imageUrl
      };
      
      // Update the region
      const updatedRegion = await this.breaksRepository.updateRegion(countryId, regionId, updateData);
      
      return {
        success: true,
        data: updatedRegion
      };
    } catch (error) {
      console.error(`Error in BreaksService.updateRegion for region ${regionId}:`, error);
      return {
        success: false,
        error: "Failed to update region"
      };
    }
  }
  
  /**
   * Updates an existing break
   * @param countryId The country ID
   * @param regionId The region ID
   * @param breakId The break ID to update
   * @param breakData The updated break data
   * @returns The updated break
   */
  async updateBreak(countryId: string, regionId: string, breakId: string, breakData: unknown) {
    try {
      // Validate input data
      const validation = safeValidate<UpdateBreakInput>(updateBreakSchema, breakData);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid break update data: ${validation.error}`
        };
      }
      
      const validatedData = validation.data!;
      
      // Check if break exists
      const existingBreak = await this.breaksRepository.getBreakById(breakId);
      if (!existingBreak) {
        return {
          success: false,
          error: `Break with ID ${breakId} not found`
        };
      }
      
      // Prepare update data, keeping existing values if not provided
      const updateData: Break = {
        id: breakId, // ID shouldn't change
        name: validatedData.name || existingBreak.name,
        lat: typeof validatedData.lat === 'number' ? validatedData.lat : existingBreak.lat,
        lon: typeof validatedData.lon === 'number' ? validatedData.lon : existingBreak.lon,
        breakType: validatedData.breakType || existingBreak.breakType,
        bestSeason: validatedData.bestSeason || existingBreak.bestSeason,
        // Include optional fields
        description: validatedData.description ?? existingBreak.description,
        difficultyLevel: validatedData.difficultyLevel ?? existingBreak.difficultyLevel,
        swellDirection: validatedData.swellDirection ?? existingBreak.swellDirection,
        tideCondition: validatedData.tideCondition ?? existingBreak.tideCondition,
        windDirection: validatedData.windDirection ?? existingBreak.windDirection,
        localRestrictions: validatedData.localRestrictions ?? existingBreak.localRestrictions,
        hazards: validatedData.hazards ?? existingBreak.hazards,
        facilities: validatedData.facilities ?? existingBreak.facilities,
        imageUrls: validatedData.imageUrls ?? existingBreak.imageUrls
      };
      
      const updatedBreak = await this.breaksRepository.updateBreak(countryId, regionId, breakId, updateData);
      
      return {
        success: true,
        data: updatedBreak
      };
    } catch (error) {
      console.error(`Error in BreaksService.updateBreak for break ${breakId}:`, error);
      return {
        success: false,
        error: "Failed to update break"
      };
    }
  }
  
  /**
   * Deletes a country
   * @param countryId The country ID to delete
   * @returns Success indicator
   */
  async deleteCountry(countryId: string) {
    try {
      // Check if country exists
      const country = await this.breaksRepository.getCountryById(countryId);
      if (!country) {
        return {
          success: false,
          error: `Country with ID ${countryId} not found`
        };
      }
      
      await this.breaksRepository.deleteCountry(countryId);
      
      return {
        success: true,
        message: `Country ${countryId} successfully deleted`
      };
    } catch (error) {
      console.error(`Error in BreaksService.deleteCountry for country ${countryId}:`, error);
      return {
        success: false,
        error: "Failed to delete country"
      };
    }
  }
  
  /**
   * Deletes a region
   * @param countryId The country ID
   * @param regionId The region ID to delete
   * @returns Success indicator
   */
  async deleteRegion(countryId: string, regionId: string) {
    try {
      // Check if region exists
      const region = await this.breaksRepository.getRegionById(countryId, regionId);
      if (!region) {
        return {
          success: false,
          error: `Region with ID ${regionId} not found in country ${countryId}`
        };
      }
      
      await this.breaksRepository.deleteRegion(countryId, regionId);
      
      return {
        success: true,
        message: `Region ${regionId} successfully deleted`
      };
    } catch (error) {
      console.error(`Error in BreaksService.deleteRegion for region ${regionId}:`, error);
      return {
        success: false,
        error: "Failed to delete region"
      };
    }
  }
  
  /**
   * Deletes a break
   * @param countryId The country ID
   * @param regionId The region ID
   * @param breakId The break ID to delete
   * @returns Success indicator
   */
  async deleteBreak(countryId: string, regionId: string, breakId: string) {
    try {
      // Check if break exists
      const surfBreak = await this.breaksRepository.getBreakById(breakId);
      if (!surfBreak) {
        return {
          success: false,
          error: `Break with ID ${breakId} not found`
        };
      }
      
      await this.breaksRepository.deleteBreak(countryId, regionId, breakId);
      
      return {
        success: true,
        message: `Break ${breakId} successfully deleted`
      };
    } catch (error) {
      console.error(`Error in BreaksService.deleteBreak for break ${breakId}:`, error);
      return {
        success: false,
        error: "Failed to delete break"
      };
    }
  }





  // FUTURE IMPLEMENTATIONS BOILERPLATE IDEAS 
  
  /**
   * Searches for breaks based on provided criteria
   * @param params Search parameters
   * @returns Matching breaks
   */

  /* async searchBreaks(params: unknown) {
    try {
      // Validate search parameters
      const validation = safeValidate<SearchBreaksParams>(searchBreaksSchema, params);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid search parameters: ${validation.error}`
        };
      }
      
      const validatedParams = validation.data!;
      
      const results = await this.breaksRepository.searchBreaks(validatedParams);
      
      return {
        success: true,
        data: results
      };
    } catch (error) {
      console.error("Error in BreaksService.searchBreaks:", error);
      return {
        success: false,
        error: "Failed to search breaks"
      };
    }
  } */
  
  /**
   * Finds breaks near a specific location
   * @param params Nearby search parameters (lat, lon, radius)
   * @returns Nearby breaks
   */
  
  /* async findNearbyBreaks(params: unknown) {
    try {
      // Validate nearby search parameters
      const validation = safeValidate<NearbyBreaksParams>(nearbyBreaksSchema, params);
      if (!validation.success) {
        return {
          success: false,
          error: `Invalid nearby search parameters: ${validation.error}`
        };
      }
      
      const validatedParams = validation.data!;
      
      const results = await this.breaksRepository.findNearbyBreaks(
        validatedParams.lat, 
        validatedParams.lon, 
        validatedParams.radius || 50 // Default radius of 50km if not specified
      );
      
      return {
        success: true,
        data: results
      };
    } catch (error) {
      console.error("Error in BreaksService.findNearbyBreaks:", error);
      return {
        success: false,
        error: "Failed to find nearby breaks"
      };
    }
  } */
  
  /**
   * Gets statistical information about the breaks database
   * @returns Statistical information
   */

 /*  async getStatistics() {
    try {
      const countries = await this.breaksRepository.getAllCountries();
      
      let totalRegions = 0;
      let totalBreaks = 0;
      let breakTypeDistribution: Record<string, number> = {};
      let difficultyDistribution: Record<string, number> = {};
      
      // Count regions and breaks, calculate distributions
      for (const country of countries) {
        if (country.regions) {
          totalRegions += country.regions.length;
          
          for (const region of country.regions) {
            if (region.breaks) {
              totalBreaks += region.breaks.length;
              
              for (const breakItem of region.breaks) {
                // Break type distribution
                if (breakItem.breakType) {
                  breakTypeDistribution[breakItem.breakType] = 
                    (breakTypeDistribution[breakItem.breakType] || 0) + 1;
                }
                
                // Difficulty distribution
                if (breakItem.difficultyLevel) {
                  difficultyDistribution[breakItem.difficultyLevel] = 
                    (difficultyDistribution[breakItem.difficultyLevel] || 0) + 1;
                }
              }
            }
          }
        }
      }
      
      return {
        success: true,
        data: {
          totalCountries: countries.length,
          totalRegions,
          totalBreaks,
          breakTypeDistribution,
          difficultyDistribution
        }
      };
    } catch (error) {
      console.error("Error in BreaksService.getStatistics:", error);
      return {
        success: false,
        error: "Failed to get statistics"
      };
    }
  } */
  
  /**
   * Gets recommendations based on user preferences
   * @param preferences User preferences (difficulty, breakType, etc.)
   * @returns Recommended breaks
   */

  /* async getRecommendations(preferences: {
    difficultyLevel?: string;
    breakType?: string;
    season?: string;
    countryId?: string;
  }) {
    try {
      // Get all breaks
      const countries = await this.breaksRepository.getAllCountries();
      let recommendations: Break[] = [];
      
      // Collect all breaks that match preferences
      for (const country of countries) {
        // Skip if country filter is applied and doesn't match
        if (preferences.countryId && country.id !== preferences.countryId) {
          continue;
        }
        
        if (country.regions) {
          for (const region of country.regions) {
            if (region.breaks) {
              for (const breakItem of region.breaks) {
                let matches = true;
                
                // Apply filters
                if (preferences.difficultyLevel && 
                    breakItem.difficultyLevel !== preferences.difficultyLevel) {
                  matches = false;
                }
                
                if (preferences.breakType && 
                    breakItem.breakType !== preferences.breakType) {
                  matches = false;
                }
                
                if (preferences.season && 
                    breakItem.bestSeason !== preferences.season) {
                  matches = false;
                }
                
                if (matches) {
                  // Add country and region info to the break
                  recommendations.push({
                    ...breakItem,
                    countryName: country.name,
                    regionName: region.name
                  });
                }
              }
            }
          }
        }
      }
      
      // Sort by difficulty level (beginner first, then intermediate, then advanced)
      const difficultyOrder: Record<string, number> = {
        'beginner': 1,
        'intermediate': 2,
        'advanced': 3,
        'expert': 4
      };
      
      recommendations.sort((a, b) => {
        if (a.difficultyLevel && b.difficultyLevel) {
          return (difficultyOrder[a.difficultyLevel] || 5) - (difficultyOrder[b.difficultyLevel] || 5);
        }
        return 0;
      });
      
      return {
        success: true,
        data: recommendations.slice(0, 10) // Return top 10 recommendations
      };
    } catch (error) {
      console.error("Error in BreaksService.getRecommendations:", error);
      return {
        success: false,
        error: "Failed to get recommendations"
      };
    }
  } */

}