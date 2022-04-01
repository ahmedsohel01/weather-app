// API Key
const APIkey = "914c560a684e8211499f89f4ce00e364";

// Selector
const form = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const currentDate = document.querySelector(".date");
const currentTime = document.querySelector(".time");
const weatherDiv = document.querySelector(".weather");
const WeatherNxt = document.querySelector(".weather-next");

// Get Date And Time
const time = new Date();
const year = time.getFullYear();
const month = time.getMonth() + 1;
const newMonth = month < 10 ? "0" + month : month;
const date = time.getDate();
const newDate = date < 10 ? "0" + date : date;
currentDate.innerHTML = `${newDate}-${newMonth}-${year}`;
setInterval(() => {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hoursIn12HrFormat = hours >= 13 ? hours % 12 : hours;
  const ampm = hours >= 12 ? "PM" : "AM";
  currentTime.innerHTML = `${
    hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat
  }:${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  } ${ampm}`;
});
//   Get Data From API

function getData() {
  // get input from form

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let city = searchInput.value;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&&cnt=5&units=imperial`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        randerData(data);
      });
  });
}
getData();

// Show Weather Data
function randerData(data) {
  weatherDiv.innerHTML = "";
  WeatherNxt.innerHTML = "";
  const weatherData = document.createElement("div");
  weatherData.classList.add("weather-data");

  // store Data
  const days5 = data.list;
  const city = data.city.name;
  const icon = data.list[0].weather[0].icon;
  const temp = data.list[0].main.temp;
  const type = data.list[0].weather[0].description;

  weatherData.innerHTML = `
  <h2 class="city-name">${city}</h2>
  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" />
  <p>${temp}<sup>&deg;F</sup></p>
  <p class="type">${type}</p>
  `;
  weatherDiv.appendChild(weatherData);

  for (const [i, day] of days5.entries()) {
    const weatherNxtData = document.createElement("div");
    weatherNxtData.classList.add("weather-next-data");
    console.log(i, day);
    const icon = day.weather[0].icon;
    const temp = day.main.temp;
    const type = day.weather[0].description;
    weatherNxtData.innerHTML = `
            <div class="date">
              <p>${date + i}-${month}-${year}</p>
            </div>
            <div class="weather">
              <img src="http://openweathermap.org/img/wn/${icon}@2x.png"" alt="" />
              <p>${temp}<sup>&deg;F</sup></p>
              <p class="type">${type}</p>
            </div>`;
    WeatherNxt.appendChild(weatherNxtData);
  }
}
