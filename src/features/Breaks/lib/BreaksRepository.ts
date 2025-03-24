import fs from 'fs/promises';
import path from 'path';
import type { Country, Region, Break } from './validations/schemas';

export class BreaksRepository {
  private filePath: string;
  
  constructor(filePath: string = path.join(process.cwd(), 'src/features/Breaks/lib/breaks.json')) {
    this.filePath = filePath;
  }
  
  /**
   * Gets all countries, regions, and breaks from the JSON file
   * @returns All countries with their regions and breaks
   */
  async getAllCountries(): Promise<Country[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      return parsedData.countries;
    } catch (error) {
      console.error("Repository error getting all countries:", error);
      throw new Error(`Failed to get countries: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Gets a specific country by ID
   * @param countryId The country ID
   * @returns The country with its regions and breaks
   */
  async getCountryById(countryId: string): Promise<Country | null> {
    try {
      const countries = await this.getAllCountries();
      return countries.find(country => country.id === countryId) || null;
    } catch (error) {
      console.error(`Repository error getting country with ID ${countryId}:`, error);
      throw new Error(`Failed to get country: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Gets all regions for a specific country
   * @param countryId The country ID
   * @returns The regions for the specified country
   */
  async getRegionsByCountryId(countryId: string): Promise<Region[]> {
    try {
      const country = await this.getCountryById(countryId);
      return country?.regions || [];
    } catch (error) {
      console.error(`Repository error getting regions for country ID ${countryId}:`, error);
      throw new Error(`Failed to get regions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Gets a specific region by ID
   * @param countryId The country ID
   * @param regionId The region ID
   * @returns The region with its breaks
   */
  async getRegionById(countryId: string, regionId: string): Promise<Region | null> {
    try {
      const regions = await this.getRegionsByCountryId(countryId);
      return regions.find(region => region.id === regionId) || null;
    } catch (error) {
      console.error(`Repository error getting region with ID ${regionId}:`, error);
      throw new Error(`Failed to get region: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Gets all breaks for a specific region
   * @param countryId The country ID
   * @param regionId The region ID
   * @returns The breaks for the specified region
   */
  async getBreaksByRegionId(countryId: string, regionId: string): Promise<Break[]> {
    try {
      const region = await this.getRegionById(countryId, regionId);
      return region?.breaks || [];
    } catch (error) {
      console.error(`Repository error getting breaks for region ID ${regionId}:`, error);
      throw new Error(`Failed to get breaks: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Gets a specific break by ID
   * @param breakId The break ID
   * @returns The break if found
   */
  async getBreakById(breakId: string): Promise<Break | null> {
    try {
      const countries = await this.getAllCountries();
      
      for (const country of countries) {
        for (const region of country.regions) {
          const breakFound = region.breaks.find(b => b.id === breakId);
          if (breakFound) {
            return breakFound;
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Repository error getting break with ID ${breakId}:`, error);
      throw new Error(`Failed to get break: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Adds a new country to the JSON file
   * @param country The country data to add
   * @returns The added country
   */
  async addCountry(country: Omit<Country, 'regions'>): Promise<Country> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Check if country already exists
      if (parsedData.countries.some((c: Country) => c.id === country.id)) {
        throw new Error(`Country with ID ${country.id} already exists`);
      }
      
      const newCountry: Country = {
        ...country,
        regions: []
      };
      
      parsedData.countries.push(newCountry);
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return newCountry;
    } catch (error) {
      console.error("Repository error adding country:", error);
      throw new Error(`Failed to add country: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Adds a new region to a country
   * @param countryId The country ID
   * @param region The region data to add
   * @returns The added region
   */
  async addRegion(countryId: string, region: Omit<Region, 'breaks'>): Promise<Region> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Check if region already exists
      if (parsedData.countries[countryIndex].regions.some((r: Region) => r.id === region.id)) {
        throw new Error(`Region with ID ${region.id} already exists in country ${countryId}`);
      }
      
      const newRegion: Region = {
        ...region,
        breaks: []
      };
      
      parsedData.countries[countryIndex].regions.push(newRegion);
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return newRegion;
    } catch (error) {
      console.error(`Repository error adding region to country ${countryId}:`, error);
      throw new Error(`Failed to add region: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Adds a new surf break to a region
   * @param countryId The country ID
   * @param regionId The region ID
   * @param breakData The break data to add
   * @returns The added break
   */
  async addBreak(countryId: string, regionId: string, breakData: Break): Promise<Break> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Find the region
      const regionIndex = parsedData.countries[countryIndex].regions.findIndex((r: Region) => r.id === regionId);
      if (regionIndex === -1) {
        throw new Error(`Region with ID ${regionId} not found in country ${countryId}`);
      }
      
      // Check if break already exists
      if (parsedData.countries[countryIndex].regions[regionIndex].breaks.some((b: Break) => b.id === breakData.id)) {
        throw new Error(`Break with ID ${breakData.id} already exists in region ${regionId}`);
      }
      
      parsedData.countries[countryIndex].regions[regionIndex].breaks.push(breakData);
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return breakData;
    } catch (error) {
      console.error(`Repository error adding break to region ${regionId}:`, error);
      throw new Error(`Failed to add break: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Updates an existing country
   * @param countryId The country ID to update
   * @param countryData The updated country data
   * @returns The updated country
   */
  async updateCountry(countryId: string, countryData: Omit<Country, 'regions'>): Promise<Country> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Update country, preserving regions
      parsedData.countries[countryIndex] = {
        ...countryData,
        regions: parsedData.countries[countryIndex].regions
      };
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return parsedData.countries[countryIndex];
    } catch (error) {
      console.error(`Repository error updating country ${countryId}:`, error);
      throw new Error(`Failed to update country: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Updates an existing region
   * @param countryId The country ID
   * @param regionId The region ID to update
   * @param regionData The updated region data
   * @returns The updated region
   */
  async updateRegion(countryId: string, regionId: string, regionData: Omit<Region, 'breaks'>): Promise<Region> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Find the region
      const regionIndex = parsedData.countries[countryIndex].regions.findIndex((r: Region) => r.id === regionId);
      if (regionIndex === -1) {
        throw new Error(`Region with ID ${regionId} not found in country ${countryId}`);
      }
      
      // Update region, preserving breaks
      parsedData.countries[countryIndex].regions[regionIndex] = {
        ...regionData,
        breaks: parsedData.countries[countryIndex].regions[regionIndex].breaks
      };
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return parsedData.countries[countryIndex].regions[regionIndex];
    } catch (error) {
      console.error(`Repository error updating region ${regionId}:`, error);
      throw new Error(`Failed to update region: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
  async updateBreak(countryId: string, regionId: string, breakId: string, breakData: Break): Promise<Break> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Find the region
      const regionIndex = parsedData.countries[countryIndex].regions.findIndex((r: Region) => r.id === regionId);
      if (regionIndex === -1) {
        throw new Error(`Region with ID ${regionId} not found in country ${countryId}`);
      }
      
      // Find the break
      const breakIndex = parsedData.countries[countryIndex].regions[regionIndex].breaks.findIndex((b: Break) => b.id === breakId);
      if (breakIndex === -1) {
        throw new Error(`Break with ID ${breakId} not found in region ${regionId}`);
      }
      
      // Update break
      parsedData.countries[countryIndex].regions[regionIndex].breaks[breakIndex] = breakData;
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return breakData;
    } catch (error) {
      console.error(`Repository error updating break ${breakId}:`, error);
      throw new Error(`Failed to update break: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Deletes a country
   * @param countryId The country ID to delete
   * @returns Boolean indicating success
   */
  async deleteCountry(countryId: string): Promise<boolean> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Remove country
      parsedData.countries.splice(countryIndex, 1);
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return true;
    } catch (error) {
      console.error(`Repository error deleting country ${countryId}:`, error);
      throw new Error(`Failed to delete country: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Deletes a region
   * @param countryId The country ID
   * @param regionId The region ID to delete
   * @returns Boolean indicating success
   */
  async deleteRegion(countryId: string, regionId: string): Promise<boolean> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Find the region
      const regionIndex = parsedData.countries[countryIndex].regions.findIndex((r: Region) => r.id === regionId);
      if (regionIndex === -1) {
        throw new Error(`Region with ID ${regionId} not found in country ${countryId}`);
      }
      
      // Remove region
      parsedData.countries[countryIndex].regions.splice(regionIndex, 1);
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return true;
    } catch (error) {
      console.error(`Repository error deleting region ${regionId}:`, error);
      throw new Error(`Failed to delete region: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Deletes a break
   * @param countryId The country ID
   * @param regionId The region ID
   * @param breakId The break ID to delete
   * @returns Boolean indicating success
   */
  async deleteBreak(countryId: string, regionId: string, breakId: string): Promise<boolean> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Find the country
      const countryIndex = parsedData.countries.findIndex((c: Country) => c.id === countryId);
      if (countryIndex === -1) {
        throw new Error(`Country with ID ${countryId} not found`);
      }
      
      // Find the region
      const regionIndex = parsedData.countries[countryIndex].regions.findIndex((r: Region) => r.id === regionId);
      if (regionIndex === -1) {
        throw new Error(`Region with ID ${regionId} not found in country ${countryId}`);
      }
      
      // Find the break
      const breakIndex = parsedData.countries[countryIndex].regions[regionIndex].breaks.findIndex((b: Break) => b.id === breakId);
      if (breakIndex === -1) {
        throw new Error(`Break with ID ${breakId} not found in region ${regionId}`);
      }
      
      // Remove break
      parsedData.countries[countryIndex].regions[regionIndex].breaks.splice(breakIndex, 1);
      
      await fs.writeFile(this.filePath, JSON.stringify(parsedData, null, 4), 'utf8');
      
      return true;
    } catch (error) {
      console.error(`Repository error deleting break ${breakId}:`, error);
      throw new Error(`Failed to delete break: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}