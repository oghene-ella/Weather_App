let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
    wind: 30,
    per: "30%",
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
    wind: 45,
    per: "10%",
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
    wind: 28,
    per: "36.5%",
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
    wind: 40,
    per: "60%",
  },
  oslo: {
    temp: -5,
    humidity: 20,
    wind: 50,
    per: "10%",
  },
};

// write your code here

// get the current day and time
let date_method, my_day, my_time_hour, my_time_min;
date_method = new Date();

my_time_hour = date_method.getHours();

my_time_min = date_method.getMinutes();

my_day = date_method.getDay();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let days_new = days[my_day];

// get the elements for the day and time
let day_el = document.querySelector(".day");
let time_el = document.querySelector(".time");
day_el.innerHTML = days_new + " | ";
time_el.innerHTML = my_time_hour + ":" + my_time_min;

//get the elements for the search bar
let button_submit = document.querySelector(".btn");


function showIt(e){
  e.preventDefault();
  let input_search = document.querySelector(".form-control");
  let checkIt = document.querySelector(".check_city");
  let text =
    input_search.value[0].toUpperCase() +
    input_search.value.substr(1, input_search.value.length).toLowerCase();
  checkIt.innerHTML = text;

  // if (
  //   weather[input_search.value] === undefined ||
  //   weather[input_search.value] === null
  // ) {
  //   console.log(
  //     `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${input_search.value.toLowerCase()} 🥷🏾`
  //   );
  // } else {
  //   let temp1 = weather[input_search.value].temp;
  //   let the_humidity = weather[input_search.value].humidity;
  //   let celsiusTemp = Math.round(temp1);
  //   let fahrenheitTemp = Math.round((temp1 * 9) / 5 + 32);
  //   console.log(
  //     `It is currently ${fahrenheitTemp}° F in ${input_search.value} with a humidity of ${the_humidity}`
  //   );
  // }
}
button_submit.addEventListener("click", showIt);

let cel = document.querySelector(".temp_cel");
let fah = document.querySelector(".temp_fah");
let temp_val = document.querySelector(".temp_val");
let temp_val1 = temp_val.innerText

console.log(temp_val1);

function fah_convert(){
   let fahrenheitTemp = Math.round((temp_val1 * 9) / 5 + 32);
  temp_val.innerHTML = fahrenheitTemp;
}

fah.addEventListener("click", fah_convert);

function cel_convert() {
  let celsiusTemp = Math.round(temp_val1);
  temp_val.innerHTML = celsiusTemp;

}
cel.addEventListener("click",cel_convert);