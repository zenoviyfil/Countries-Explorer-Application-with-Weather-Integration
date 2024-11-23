import { Country } from "../types/Country";

export const filterByRegion = (
  countries: Country[],
  regionCode: string
): Country[] => {
  if (!regionCode) return countries;

  return countries.filter((country) =>
    country.awsRegion.toLowerCase().startsWith(regionCode.toLowerCase())
  );
};

export const filterByLanguage = (countries: Country[], languageName: string): Country[] => {
  if (!languageName) return countries;

  return countries.filter((country) =>
    country.languages.some((language) => language.name.toLowerCase() === languageName.toLowerCase())
  );
};
