let now = new Date();
function formatDate(date){

let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
let currentDay = days[now.getDay()];

let currentdate = now.getDate();

let currentHour = now.getHours();
if (currentHour < 10) {
     currentHour = `0${currentHour}`;
}

let currentMinute = now.getMinutes();
if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;}

let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
let currentMonth = months[now.getMonth()];

let showTime = document.querySelector("#currentTime");
showTime.innerHTML = `${currentDay}, ${currentMonth} ${currentdate}, <br /> ${currentHour}:${currentMinute}`;
}
formatDate();


function showWeather(response){
    document.querySelector("#city").innerHTML= `${response.data.name}`;
    document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
    document.querySelector("#sky").innerHTML= response.data.weather[0].main;
    document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#feels-like").innerHTML=Math.round(response.data.main.feels_like);
    document.querySelector("#wind").innerHTML= response.data.wind.speed;
    document.querySelector("#humidity").innerHTML=response.data.main.humidity;
}

function displayCityWeather(city){
    let citySearch = document.querySelector("#search-city").value;
    let apiKey = "e6fd7ecc8e8874aa21ff2b9996064645";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
}

function searchCity(event){
    event.preventDefault();
    let city = document.querySelector("#city");
    let cityInput = document.querySelector("#search-city");
    city.innerHTML = cityInput.value;
    displayCityWeather(cityInput);    
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);


function showPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let key = "e6fd7ecc8e8874aa21ff2b9996064645";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;

    axios.get(url).then(showWeather);
}

function getLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click",getLocation);
