const COUNTRY_REQUEST_HEAD = "https://restcountries.eu/rest/v2/name/";

const request = (countryName) => {
  return fetch(COUNTRY_REQUEST_HEAD + countryName);
};

export default request;
