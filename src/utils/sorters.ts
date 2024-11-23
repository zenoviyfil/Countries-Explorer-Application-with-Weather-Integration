import { Country } from "../types/Country";
import { getAreaFromCountry, getPopulationFromCountry } from "./helpers";

export const sortByName = (
  countries: Country[],
  ascending: boolean = true
): Country[] => {
  return countries.sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return ascending ? comparison : -comparison;
  });
};

export const sortByPopulation = (
  countries: Country[],
): Country[] => {
return countries.sort((a, b) => {
  const populationA = getPopulationFromCountry(a.name).replace(/\s+/g, "") ?? 0;
  const populationB = getPopulationFromCountry(b.name).replace(/\s+/g, "") ?? 0;

  return Number(populationA) - Number(populationB)
})
};

export const sortByArea = (countries: Country[]): Country[] => {
  return countries.sort((a, b) => {
    const areaA = getAreaFromCountry(a.name).replace(/\s+/g, "") ?? 0;
    const areaB = getAreaFromCountry(b.name).replace(/\s+/g, "") ?? 0;


    if (Number(areaA[0]) === 0) {
      return -1
    }

    return Number(areaA) - Number(areaB);
  });
};
