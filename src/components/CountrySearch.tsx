import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../services/countriesQueries";
import { Country } from "../types/Country";
import {
  capitalizeInput,
  getAreaFromCountry,
  getPopulationFromCountry,
  transformRegionName,
} from "../utils/helpers";

interface CountrySearchProps {
  setSelectedCountry: (country: Country | null) => void;
  setInitialCountries: (countries: Country[]) => void;
  filteredCountries: Country[];
}

const CountrySearch: React.FC<CountrySearchProps> = ({
  setSelectedCountry,
  setInitialCountries,
  filteredCountries,
}) => {
  const [countryName, setCountryName] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: { name: capitalizeInput(search) },
    onCompleted: (data) => {
      setInitialCountries(data.countries);
    },
  });

  const handleSearch = () => {
    setSearch(countryName);
  };

  const handleClear = () => {
    setCountryName('')
    setSearch('')
  }

  if (loading) return <p>{"Loading..."}</p>;
  if (error)
    return (
      <p>
        {"Error: "}
        {error.message}
      </p>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search for a country..."
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "5px",
            height: "30px",
            border: "none",
          }}
        />
        <button type="button" onClick={handleSearch}>
          {"Search"}
        </button>
        <button type="button" onClick={handleClear}>
          {"Clear"}
        </button>
      </div>
      {filteredCountries.length > 0 && !search
        ? filteredCountries.map((country: Country) => (
            <div
              style={{ cursor: "pointer" }}
              key={country.code}
              onClick={() => setSelectedCountry(country)}
            >
              <h2>{country.name}</h2>
              <p>
                {"Capital: "}
                {country.capital}
              </p>
              <p>
                {"Region: "}
                {transformRegionName(country.awsRegion)}
              </p>
              <p>
                {"Language: "}
                {country.languages[0]?.name}
              </p>
              <p>
                {"Area: "}
                {getAreaFromCountry(country.name)}
                {"km²"}
              </p>
              <p>
                {"Population: "}
                {getPopulationFromCountry(country.name) < "1"
                  ? "0"
                  : getPopulationFromCountry(country.name)}
              </p>
            </div>
          ))
        : data.countries.map((country: Country) => (
            <div
              style={{ cursor: "pointer" }}
              key={country.code}
              onClick={() => setSelectedCountry(country)}
            >
              <h2>{country.name}</h2>
              <p>
                {"Capital: "}
                {country.capital}
              </p>
              <p>
                {"Region: "}
                {transformRegionName(country.awsRegion)}
              </p>
              <p>
                {"Language: "}
                {country.languages[0]?.name}
              </p>
              <p>
                {"Area: "}
                {getAreaFromCountry(country.name)}
                {"km²"}
              </p>
              <p>
                {"Population: "}
                {getPopulationFromCountry(country.name) === "0"
                  ? "none"
                  : getPopulationFromCountry(country.name)}
              </p>
            </div>
          ))}
    </div>
  );
};

export default CountrySearch;
