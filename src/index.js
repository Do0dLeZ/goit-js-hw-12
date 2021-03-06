import "./scss/index.scss";
import singleCountryTemplate from "./handle-bars/singleCountry.hbs";
import listCountries from "./handle-bars/countriesList.hbs";

const debounce = require("lodash.debounce");

import toastr from "toastr";
import "toastr/build/toastr.css";
import toastrOptions from "./js/toastrParams.js";

import requestCountry from "./js/fetchCountries.js";

// ---------------- Main params --------------

const refs = {
  inputCountry: document.querySelector("#countryName"),
  containerCountry: document.querySelector(".country-container"),
};

toastr.options = toastrOptions;

// ----------------- Model ------------------

const countriesResponseLogic = (countries) => {
  if (countries.length === 1) {
    renderSingleCountry(countries[0]);
  } else if (countries.length > 10) {
    renderWarning();
  } else {
    renderLCountriesList(countries);
  }
};

// ----------------- Handlers ----------------

const handleInput = (e) => {
  const inputText = e.target.value;
  renderClean();

  if (inputText === "") {
    return;
  }

  requestCountry(inputText)
    .then((res) => {
      if (!res.ok) {
        throw Error(res.status);
      }
      return res.json();
    })
    .then(countriesResponseLogic)
    .catch(renderError);
};

// ----------------- Renders -----------------

const renderClean = () => {
  refs.containerCountry.textContent = "";
};

const renderError = (e) => {
  toastr.error(e, "Bad request");
};

const renderWarning = () => {
  toastr.warning("Give more info pelase...");
};

const renderSingleCountry = (country) => {
  refs.containerCountry.insertAdjacentHTML(
    "beforeend",
    singleCountryTemplate(country)
  );
};

const renderLCountriesList = (countries) => {
  refs.containerCountry.insertAdjacentHTML(
    "beforeend",
    listCountries({ countries: countries })
  );
};

// ----------------- Events ------------------

refs.inputCountry.addEventListener("input", debounce(handleInput, 500));
