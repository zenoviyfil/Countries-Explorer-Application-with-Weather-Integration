type LanguagesType = {
  name: string;
};

export interface Country {
  name: string;
  code: string;
  capital: string;
  awsRegion: string;
  languages: LanguagesType[];
  currencies: string[];
  population: string;
}

export interface AdditionalDataProps {
  awsRegion: string;
  flags: {
    svg: string;
  };
  borders: string[];
  timezones: string[];
}

export interface Weather {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}
