"use strict";

// //Select element
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

const API_ID = "1e7fb3e74bc53c11647942563733fcce";
const units = "metric";
let localLanguage = navigator.language.split("-")[1];

const searchWeather = async function (city, country) {
  try {
    const search = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}}&appid=${API_ID}`
    );

    if (!search.ok) {
      timeOutError();
      return;
    }

    const result = await search.json();

    const lang = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${result.id}&lang=${localLanguage}&appid=${API_ID}&units=${units}`
    );
    if (!lang.ok) throw new Error();
    const resultLang = await lang.json();

    return resultLang;
  } catch (error) {
    console.error(error);
  }
};
const displayWeather = async function (weather) {
  if (!weather) return;
  const resultWeather = await weather;

  const img = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  switch (resultWeather.weather[0].main) {
    case "Thunderstorm":
      img.src = "images/snow.png";
      break;
    case "Rain":
      img.src = "images/rain.png";
      break;
    case "Clear":
      img.src = "images/clear.png";
      break;
    case "Clouds":
      img.src = "images/cloud.png";
      break;

    default:
      img.src = "";
  }

  temperature.innerHTML = `${parseInt(resultWeather.main.temp)}<span>C°</span>`;
  description.innerHTML = `${resultWeather.weather[0].description}`;
  humidity.innerHTML = `${resultWeather.main.humidity}%`;
  wind.innerHTML = `${parseInt(resultWeather.wind.speed)}Km/h`;

  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.add("fade-in");
  weatherDetails.classList.add("fade-in");
  container.style.height = "590px";
};

const btnSearch = document.querySelector(".search-box button");

btnSearch.addEventListener("click", () => {
  const input = document.querySelector(".search-box input").value;
  if (!input) {
    timeOutError();
    return;
  }
  displayWeather(searchWeather(input));
});

function timeOutError() {
  container.style.height = "400px";
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error.style.display = "block";
  error.classList.add("fade-in");

  setTimeout(() => {
    error.style.display = "none";
    error.classList.remove("fade-in");
    container.style.height = "105px";
  }, 3000);
}
