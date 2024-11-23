import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import CountrySearch from "./components/CountrySearch";
import CountryDetails from "./components/CountryDetails";
import FilterAndSort from "./components/FilterAndSort";
import { Country } from "./types/Country";
import "./App.css";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [allCountries, setAllCountries] = useState<Country[]>([]); 
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const setInitialCountries = (countries: Country[]) => {
    setAllCountries(countries);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>{"Countries Explorer"}</h1>
          <FilterAndSort
            countries={allCountries}
            setFilteredCountries={setFilteredCountries}
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>
        <CountrySearch
          filteredCountries={filteredCountries}
          setSelectedCountry={setSelectedCountry}
          setInitialCountries={setInitialCountries}
        />
        {selectedCountry && (
            <>
              <span className="vertical-bar"></span>
              <CountryDetails
                code={selectedCountry.code}
                name={selectedCountry.name}
              />
            </>
          )}</div>
      </div>
    </ApolloProvider>
  );
};

export default App;
