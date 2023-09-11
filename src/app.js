function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function dailyForecast(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    
    let days = ["Sun","Mon","Tue","Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response){

    // console.log(response.data.daily);
    let daysForecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    
    
    let forecastHTML = `<div class="row">`;

    daysForecast.forEach(function (forecastDay, index) {

        if (index < 5){

            forecastHTML = forecastHTML +  `
            
                <div class="col-2">
                    <div class="weather-forecast-date">
                        ${dailyForecast(forecastDay.dt)}
                    </div>
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42">
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">
                            ${Math.round(forecastDay.temp.max)}°
                        </span>
                        <span class="weather-forecast-temperature-min">
                            ${Math.round(forecastDay.temp.min)}°
                        </span>
                    </div>
                </div>
            `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;  
    forecastElement.innerHTML = forecastHTML;

}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");


  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  let weatherDescription = response.data.weather[0].description;

    // Set a class on the weather-app-wrapper based on the weather description
    let appContainer = document.querySelector('.weather-app-wrapper');

    // Remove any existing weather classes
    appContainer.classList.remove(
        'weather-description-sunny',
        'weather-description-cloudy',
        'weather-description-rainy',
        'weather-description-storm',
        'weather-description-clear-sky'
    );

    // Add the appropriate weather class based on the description
    if (weatherDescription.includes('clear')) {
        appContainer.classList.add('weather-description-sunny');
    } else if (weatherDescription.includes('cloud')) {
        appContainer.classList.add('weather-description-cloudy');
    } else if (weatherDescription.includes('rain')) {
        appContainer.classList.add('weather-description-rainy');
    } else if (weatherDescription.includes('storm')) {
        appContainer.classList.add('weather-description-storm');
    }


}

function search(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

// function getCurrentPosition() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Johannesburg");
