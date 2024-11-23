import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY_DETAILS } from "../services/countriesQueries";
import {
  fetchAdditionalData,
  fetchWeather,
} from "../services/weatherApi";
import { Country, Weather } from "../types/Country";
import { getFlagUrl, transformCountryAbbreviation } from "../utils/helpers";

interface CountryDetailsProps {
  code: string;
  name: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ code, name }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [population, setPopulation] = useState<number | null>(null);
  const [neighbors, setNeighbors] = useState<string[]>([]);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [flag, setFlag] = useState<string | null>(null);

  const { loading, error, data } = useQuery<{ country: Country }>(
    GET_COUNTRY_DETAILS,
    {
      variables: { code },
    }
  );

  useEffect(() => {
    const loadAdditionalData = async () => {
      const additionalData = await fetchAdditionalData(name);
      setPopulation(additionalData[0].population);
      setNeighbors(additionalData[0].borders);
      setTimezones(additionalData[0].timezones);
    };

    loadAdditionalData();
  }, [name]);

  useEffect(() => {
    const loadFlag = async () => {
      const flag = await getFlagUrl(code);
      setFlag(flag);
    };

    loadFlag();
  }, [code]);

  useEffect(() => {
    if (data?.country?.capital) {
      fetchWeather(data.country.capital)
        .then((weatherData) => setWeather(weatherData))
        .catch((err) => console.error(err));
    }
  }, [data]);

  if (loading) return <p>{"Loading country details..."}</p>;
  if (error)
    return (
      <p>
        {"Error: "}
        {error.message}
      </p>
    );

  const country = data?.country;

  return (
    <>
      {country && (
        <div>
          <h2>
            {"Details for "}
            {name}
          </h2>
          {flag && (
            <img src={flag} alt={`${name} flag`} style={{ width: "200px" }} />
          )}
          <p>
            {"Population: "}
            {population ? population.toLocaleString() : "N/A"}
          </p>
          <h2>{country.name}</h2>
          <p>
            {"Languages: "}
            {country.languages &&
              country.languages.map((lang) => lang.name).join(", ")}
          </p>
          <p>
            {"Currencies: "}
            {country.currencies &&
              country.currencies.map((curr) => curr).join(", ")}
          </p>
          <p>
            {"Neighbors: "}
            {neighbors &&
              neighbors
                .map((neigh) => transformCountryAbbreviation(neigh))
                .join(", ")}
          </p>
          <p>
            {"Timezones: "}
            {timezones && timezones.join(", ")}
          </p>

          {weather && (
            <div>
              <h3>
                {"Weather in "}
                {country.capital}
              </h3>
              <p>
                {"Temperature: "}
                {weather.main.temp}°C
              </p>
              <p>
                {"Condition: "}
                {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather icon"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CountryDetails;
