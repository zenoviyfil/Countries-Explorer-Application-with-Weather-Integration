import { countryMapping } from "./countriesAbriviations";
import { countryAreas } from "./countryAreaSqKm";
import { countryPopulations } from "./countryPopulation";

export function transformRegionName(region: string): string {
  const parts: string[] = region.split("-");

  const regionMapping: Record<string, string> = {
    eu: "Europe",
    us: "United States",
    ap: "Asia Pacific",
    sa: "South America",
    af: "Africa",
    ca: "Canada",
    me: "Middle East",
  };

  const directionMapping: Record<string, string> = {
    north: "Northern",
    south: "Southern",
    east: "Eastern",
    west: "Western",
    central: "Central",
  };

  const regionName: string = regionMapping[parts[0]] || parts[0].toUpperCase();
  const directionName: string =
    directionMapping[parts[1]] || capitalize(parts[1]);
  const zone: string = parts[2] ? `Zone ${parts[2]}` : "";

  return `${regionName} ${directionName} ${zone}`.trim();
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function transformCountryAbbreviation(abbreviation: string): string {
  return (
    countryMapping[abbreviation.toUpperCase()] || `Unknown (${abbreviation})`
  );
}

export function capitalizeInput(input: string): string {
  if (!input) return "";
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export const getAreaFromCountry = (countryName: string | undefined): string => {
  if (countryName && countryAreas[countryName]) {
    return countryAreas[countryName].toLocaleString();
  }
  return "";
};

export const getPopulationFromCountry = (
  countryName: string | undefined
): string => {
  if (countryName && countryPopulations[countryName]) {
    return countryPopulations[countryName].toLocaleString();
  }
  return "";
};

export const getFlagUrl = (countryCode: string): string => {
  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
};