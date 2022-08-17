import { countriesRatio } from "./optionsSelect";

export const returnCountry = (id) => {
     const country = countriesRatio.find((country) => country.value === id);
     return country.label;
};
