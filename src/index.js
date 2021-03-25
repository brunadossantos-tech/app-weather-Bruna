
function formatDate(timestamp){
    let date = new Date(timestamp);

    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    let currentDay = days[now.getDay()];

    return `${currentDay} | ${formatHours(timestamp)}`;
}

function formatHours (timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours= `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes= `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function showWeather(response){
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement= document.querySelector("#sky");
    let maxElement = document.querySelector("#max-temp");
    let minElement = document.querySelector("#min-temp");
    let feelsElement = document.querySelector("#feels-like");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    descriptionElement.innerHTML= response.data.weather[0].main;
    maxElement.innerHTML = Math.round(response.data.main.temp_max);
    minElement.innerHTML = Math.round(response.data.main.temp_min);
    feelsElement.innerHTML=Math.round(response.data.main.feels_like);
    windElement.innerHTML= response.data.wind.speed;
    humidityElement.innerHTML=response.data.main.humidity;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.Element.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index =0; index < 6; index++){
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
        <div class="col-2">
                <h5 class="card-title"> ${formatHours(forecast.dt*1000)} <br />
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" id="icon-2" /></h5>
                <strong>${Math.round(forecast.main.temp_max)}º</strong>| ${Math.round(forecast.main.temp_min)}º</p>
            </div>`;
    }
}

function displayCityWeather(city){
    let apiKey = "e6fd7ecc8e8874aa21ff2b9996064645";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function searchCity(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-city");
    displayCityWeather(cityInput.value);    
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiustemp.classList.remove("active");
    fahrenheittemp.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiustemp.classList.add("active");
    fahrenheittemp.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let fahrenheittemp= document.querySelector("#Fahrenheit");
fahrenheittemp.addEventListener("click", displayFahrenheitTemperature);

let celsiustemp= document.querySelector("#Celsius");
celsiustemp.addEventListener("click", displayCelsiusTemperature);

displayCityWeather("Lisbon");
