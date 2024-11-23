import React, { useState } from "react";
import { filterByLanguage, filterByRegion } from "../utils/filters";
import { sortByName, sortByPopulation, sortByArea } from "../utils/sorters";
import { Country } from "../types/Country";

interface FilterAndSortProps {
  countries: Country[];
  setFilteredCountries: (countries: Country[]) => void;
}

const regionMapping: Record<string, string> = {
  eu: "Europe",
  us: "United States",
  ap: "Asia Pacific",
  sa: "South America",
  af: "Africa",
  ca: "Canada",
  me: "Middle East",
};

const languageMapping: Record<string, string> = {
  English: "English",
  Spanish: "Spanish",
  French: "French",
  German: "German",
  Chinese: "Chinese",
  Arabic: "Arabic",
};

const FilterAndSort: React.FC<FilterAndSortProps> = ({
  countries,
  setFilteredCountries,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleFilter = (regionCode: string, languageName: string) => {
    let filtered = countries;

    if (regionCode) {
      filtered = filterByRegion(filtered, regionCode);
    }
    if (languageName) {
      filtered = filterByLanguage(filtered, languageName);
    }

    setFilteredCountries(filtered);
    setSelectedRegion(regionCode);
    setSelectedLanguage(languageName);
  };

  const handleSort = (criteria: string) => {
    let sorted = [...countries];
    if (criteria === "name") sorted = sortByName(sorted);
    if (criteria === "population") sorted = sortByPopulation(sorted);
    if (criteria === "area") sorted = sortByArea(sorted);
    setFilteredCountries(sorted);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: 'space-around'
        }}
      >
        <button onClick={() => handleSort("name")}>{"Sort by Name"}</button>
        <button onClick={() => handleSort("population")}>
          {"Sort by Population"}
        </button>
        <button onClick={() => handleSort("area")}>{"Sort by Area"}</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: 'center',
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <label htmlFor="region-filter">{"Filter by Region:"}</label>
        <select
          id="region-filter"
          value={selectedRegion}
          onChange={(e) => handleFilter(e.target.value, selectedLanguage)}
        >
          <option value="">{"All Regions"}</option>
          {Object.entries(regionMapping).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <label htmlFor="language-filter">{"Filter by Language:"}</label>
        <select
          id="language-filter"
          value={selectedLanguage}
          onChange={(e) => handleFilter(selectedRegion, e.target.value)}
        >
          <option value="">{"All Languages"}</option>
          {Object.entries(languageMapping).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterAndSort;
