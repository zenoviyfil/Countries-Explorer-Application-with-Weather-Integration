import axios, { AxiosError } from "axios";

const API_KEY = "d3dad534ad90c72808b4fbafa9d0036b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching weather data:", error);
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Failed to fetch weather data: ${error.response.data?.message || "Unknown error"}`
        );
      } else if (error.request) {
        
        throw new Error("Failed to fetch weather data: No response from server");
      }
    }

    throw new Error("Failed to fetch weather data: An unexpected error occurred");
  }
};

export const fetchAdditionalData = async (countryName: string) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch additional data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching additional country data:", error);
    throw new Error("Failed to fetch additional country data: An unexpected error occurred");
  }
};