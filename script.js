"use strict";

const body = document.getElementById("body");
const API_ID = "1e7fb3e74bc53c11647942563733fcce";
const units = "metric";
const messageError = document.querySelector(
  ".search-control__search-city--error"
);
const weatherContainer = document.getElementById("weather-container");
let language = "en";

const searchWeather = async function (city, country) {
  try {
    const searchResult = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}}&appid=${API_ID}`
    );
    if (!searchResult.ok) throw new Error(errorMessage());

    const result = await searchResult.json();

    const lang = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${result.id}&lang=${language}&appid=${API_ID}&units=${units}`
    );
    if (!lang.ok) throw new Error(errorMessage());
    const resultLang = await lang.json();

    return resultLang;
  } catch (error) {
    errorMessage();
  }
};

//Select element
const weatherElemTitle = document.querySelector(".wharher-container__titile");
const weatherElemDescri = document.querySelector(".weather-main__description");
const weatherElemTemp = document.querySelector(".weather-main__tempeture");
const weatherElemWindSpeed = document.querySelector(".wind-speed");
const weatherElemHumi = document.querySelector(".humidity");
const weatherElemFeelsLike = document.querySelector(".feels-like");
const weatherElemIcon = document.querySelector(".weather-main__image");

const displayWeather = function (resultWeather) {
  if (!resultWeather) return errorMessage();

  switch (resultWeather.weather[0].main) {
    case "Thunderstorm":
      body.style.backgroundImage = 'url("assenst/imgs/thunderstorm.jpg")';
      weatherContainer.style.backgroundImage =
        'url("assenst/imgs/thunderstorm.jpg")';
      messageError.style.color = "red";
      break;

    case "Drizzle":
      body.style.backgroundImage = 'url("assenst/imgs/drizzle.jpg")';
      weatherContainer.style.backgroundImage =
        'url("assenst/imgs/drizzle.jpg")';
      messageError.style.color = "red";
      break;
    case "Rain":
      body.style.backgroundImage = 'url("assenst/imgs/rain.jpg")';
      weatherContainer.style.backgroundImage = 'url("assenst/imgs/rain.jpg")';
      messageError.style.color = "red";
      break;
    case "Clear":
      body.style.backgroundImage = 'url("assenst/imgs/clear.jpg")';
      weatherContainer.style.backgroundImage = 'url("assenst/imgs/clear.jpg")';
      messageError.style.color = "black";
      break;
    case "Clouds":
      body.style.backgroundImage = 'url("assenst/imgs/clouds.jpg")';
      weatherContainer.style.backgroundImage = 'url("assenst/imgs/clouds.jpg")';
      messageError.style.color = "white";
      break;

    default:
      break;
  }

  //Select the value
  let weatherDescri = resultWeather.weather[0].description;
  let weatherTemp = Math.trunc(resultWeather.main.temp);
  let weatherFeels = Math.trunc(resultWeather.main.feels_like);
  let weatherHumi = resultWeather.main.humidity;
  let weatherWindSpeed = Math.trunc(resultWeather.main.feels_like);
  const icon = resultWeather.weather[0].icon;

  //// Change the HTML
  weatherElemTitle.innerHTML = resultWeather.name;
  weatherElemIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
  weatherElemDescri.innerHTML = resultWeather.weather[0].description;

  weatherElemDescri.innerHTML =
    weatherDescri.charAt(0).toUpperCase() + weatherDescri.slice(1);

  weatherElemTemp.innerHTML = weatherTemp + "&#176";
  weatherElemHumi.innerHTML = "Humidity: " + weatherHumi + "%";
  weatherElemFeelsLike.innerHTML =
    "Thermal sensation: " + weatherFeels + "&#176";
  weatherElemWindSpeed.innerHTML =
    "The wind speed is : " + weatherWindSpeed + " m/s";
  weatherContainer.style.display = "block";
};

const btnSearch = document.querySelector(".search-control__search-city--btn");

btnSearch.addEventListener("click", async function (e) {
  const inputName = document.querySelector(
    ".search-control__search-city--input"
  ).value;

  if (searchWeather && inputName) {
    displayWeather(await searchWeather(inputName));
  } else errorMessage();
});

function errorMessage(error = "Check if the data is correct.") {
  messageError.style.visibility = "visible";
  messageError.style.position = "relative";
  messageError.style.transform = "translateY(0px)";
  setTimeout(() => {
    messageError.style.visibility = "hidden";
    messageError.style.position = "absolute";
    messageError.style.transform = "translateY(40px)";
  }, 3000);
  return (messageError.innerHTML = error);
}
