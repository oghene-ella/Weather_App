// show date and time
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let real_date = date.getDate()
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let month = months[date.getMonth()];
    let day = days[date.getDay()]
    return `Last Updated - ${day}, ${real_date}th ${month} ${year} | ${hours}:${minutes}`;
}

// show most results
function showTopResults(result) {
  let temp = document.querySelector(".temp");
  let cel_temp = Math.round(result.data.temperature.current);
  temp.innerHTML = `${cel_temp}°C`;

  // icon
  let img_icon = document.querySelector("#icon");
  let icon = result.data.condition.icon;
  let icon_url = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`;
  img_icon.setAttribute("src", icon_url);

  // location
  let location = document.querySelector(".location");
  location.innerHTML = `${result.data.city} | ${result.data.country}`;

  // date 
  let date = document.querySelector(".the_date");
  date.innerHTML = formatDate(result.data.time * 1000);

  let pressure = document.querySelector(".pressure_val");
  pressure.innerHTML = `${result.data.temperature.pressure} Pa`;

  let humidity = document.querySelector(".hum_val");
  humidity.innerHTML = `${result.data.temperature.humidity} %`;

  let speed = document.querySelector(".wind_val");
  speed.innerHTML = `${result.data.wind.speed} mph`;

  getForecast(result.data.coordinates);

  let description = result.data.condition.description;
  let description1 = document.querySelector(".content");
  description1.innerHTML = `${result.data.condition.description}`;

    if (description == "Clear sky") {
      console.log(cel_temp);
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), https://wallpaperset.com/w/full/9/4/a/220858.jpg')";
    } else if (
      description == "Few clouds" ||
      description == "overcast clouds"
    ) {
      console.log(cel_temp);
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/8/4/e/189140.jpg')";
    } else if (description == "Scattered clouds") {
      console.log(cel_temp);
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/0/b/0/189227.jpg')";
    } else if (description == "Broken clouds") {;
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/c/d/0/189224.jpg')";
    } else if (description == "Shower rain") {;
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/8/b/6/32254.jpg')";
    } else if (description == "Rain") {;
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/b/a/f/32255.jpg')";
    } else if (description == "Thunderstorm") {
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/2/3/7/189232.jpg')";
    } else if (description == "Snow") {
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/e/0/4/453086.jpg')";
    } else if (description == "Mist") {
      let bodyCont = document.querySelector("body");
      bodyCont.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/f/f/c/189311.jpg')";
    }
    else{
        let bodyCont = document.querySelector("body");
        bodyCont.style.backgroundImage =
          "linear-gradient(rgba(0, 0, 0, 0.241), rgba(0, 0, 0, 0.35)), url('https://wallpaperset.com/w/full/2/b/9/57609.jpg')";
    }

}

// show forecasts
function getForecast(coordinates) {
  let apiKey = "8t33e4c238ca15f8a077046of20eb747";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function searchIt(city) {
  let apiKey = "8t33e4c238ca15f8a077046of20eb747";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showTopResults);
}
searchIt("Ibadan");

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city_search");
    searchIt(city.value);
}
let search_form = document.querySelector("#search");
search_form.addEventListener("click", handleSubmit);


// forecast
function formatDay(timestamp) {
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

function showForecast(result) {
  let daily_forecast = result.data.daily;
  let forecastEl = document.querySelector("#forecast");
  let forecastHtml = `<section class="row" id="forecast">`;
  daily_forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHtml += `
        <div class="col-2" id="items">
            <div class="weather-forecast-date">
                ${formatDay(forecastDay.time)}
            </div>
            <hr>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png" alt=""
            />
            <div class="weather-forecast-temp">
                <span class="weather-max">
                    ${Math.round(forecastDay.temperature.minimum)}° 
                </span>
                | 
                <span class="weather-min">
                    ${Math.round(forecastDay.temperature.maximum)}°
                </span>
            </div>
        </div>`;
    }
  });
  forecastHtml = forecastHtml + `</section>`;
  forecastEl.innerHTML = forecastHtml;
}