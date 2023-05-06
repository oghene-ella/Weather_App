function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes =  `0${minutes}`
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let day = days[date.getDay()]
    return `${day} | ${hours}:${minutes}`;
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
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
    return day;
}

function getForecast(coordinates){
    let apiKey = "8t33e4c238ca15f8a077046of20eb747";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast)
}

function showTemp(result){
    let city =  document.querySelector('.city')
    city.innerHTML = result.data.city

    celElement = result.data.temperature.current;

    let tempEl = document.querySelector('.temp');
    let tempEl_new = Math.round(result.data.temperature.current)
    tempEl.innerHTML = tempEl_new

    let description = document.querySelector('.content')
    description.innerHTML = result.data.condition.description;

    let pressure = document.querySelector('.pressure');
    pressure.innerHTML = result.data.temperature.pressure

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = result.data.temperature.humidity;

    let speed = document.querySelector(".speed");
    speed.innerHTML = result.data.wind.speed;

    let date = document.querySelector(".date");
    date.innerHTML = formatDate(result.data.time * 1000)

    let img_icon = document.querySelector('#icon');
    let icon = result.data.condition.icon
    let icon_url =
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
    img_icon.setAttribute('src', icon_url);

    getForecast(result.data.coordinates)
}

function searchIt(city){
    let apiKey = "8t33e4c238ca15f8a077046of20eb747";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event){
    event.preventDefault()
    let city = document.querySelector('#city-search');
    searchIt(city.value);
}
searchIt('Ibadan')

let search_form = document.querySelector("#search")
search_form.addEventListener("submit", handleSubmit)

let celElement = null;

function convert_Fah(event) {
    event.preventDefault();
    celsius.classList.remove('active')
    fahrenheit.classList.add("active");
    let temp = document.querySelector(".temp");
    let fah_temp = (celElement * 9/5) + 32
    temp.innerHTML = Math.round(fah_temp)
}

let fahrenheit = document.querySelector('#fahrenheit');
fahrenheit.addEventListener("click", convert_Fah);


function convert_Cel(event) {
    event.preventDefault();
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    let temp = document.querySelector(".temp");
    let cel_temp = Math.round(celElement);
    temp.innerHTML = cel_temp;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convert_Cel);


function showForecast(result) {
    let daily_forecast = result.data.daily
    let forecastEl = document.querySelector("#forecast");
    let forecastHtml = `<section class="row" id="forecast">`;
    daily_forecast.forEach(function (forecastDay, index){

    if (index < 6){
    forecastHtml += `
        <div class="col-2">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.time)}
            </div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
            }.png" alt=""
            width="46"/>
            <div class="weather-forecast-temp">
                <span class="weather-max">
                    ${Math.round(forecastDay.temperature.maximum)}° 
                </span>
                | 
                <span class="weather-min">
                    ${Math.round(forecastDay.temperature.minimum)}°
                </span>
            </div>
        </div>`;
        }
    });
    forecastHtml = forecastHtml + `</section>`
    forecastEl.innerHTML = forecastHtml;
}