import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries($name: String!) {
    countries(filter: { name: { regex: $name } }) {
      code
      name
      capital
      awsRegion
      languages {
        name
      }
    }
  }
`;

export const GET_COUNTRY_DETAILS = gql`
query GetCountryInfo($code: ID!) {
  country(code: $code) {
    name
    capital
    currencies
    capital
    languages {
      name
      native
    }
    continent {
      name
    }
  }
}
`;
