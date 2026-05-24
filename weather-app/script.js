// User Inputs/Events
const form = document.querySelector("form");
const userLocation = document.querySelector(".searchField");

// UI views
const temp = document.querySelector(".temp");
const city = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const icon = document.querySelector(".weather_condition img");
const weather = document.querySelector(".weather_condition span");

//Additional UI views
const feelsLike = document.querySelector(".weather-details div:nth-child(1) span:nth-child(2)");
const humidity = document.querySelector(".weather-details div:nth-child(2) span:nth-child(2)");
const wind = document.querySelector(".weather-details div:nth-child(3) span:nth-child(2)");
const visibility = document.querySelector(".weather-details div:nth-child(4) span:nth-child(2)");
const uvIndex = document.querySelector(".weather-details div:nth-child(5) span:nth-child(2)");
const pressure = document.querySelector(".weather-details div:nth-child(6) span:nth-child(2)");

form.addEventListener("submit", search);

let targetLoc = "London";
function search(e) {
  e.preventDefault(); // Preventing the page to submit.
  //   console.log("Form submitted");
  targetLoc = userLocation.value;
  //   console.log(targetLoc);
  fetchData(targetLoc);
}

async function fetchData(targetLoc) {
  try {
    // Inject dynamic data between string using template literalse5e
    const endpoint = `https://api.weatherapi.com/v1/current.json?key=9f70ccd2dd924e9ca2d141312262205&q=${targetLoc}&aqi=yes`;
    let response = await fetch(endpoint);
    // console.log("Response: ", response);
    let data = await response.json();
    // console.log("Data: ", data);

    let currTemp = data.current.temp_c;
    let currCity = data.location.name;
    let currDate = data.location.localtime;
    let currIcon = data.current.condition.icon;
    let currCondition = data.current.condition.text;

    let feelsLikeValue = data.current.feelslike_c;
    let humidityValue = data.current.humidity;
    let windValue = data.current.wind_kph;
    let visibilityValue = data.current.vis_km;
    let uvIndexValue = data.current.uv;
    let pressureValue = data.current.pressure_mb;

    if(currCity.length >= 7) {
      currCity = currCity.slice(0, 3) + "...";
    }

    updateUI(currTemp, 
              currCity,
              currDate,
              currIcon,
              currCondition);

    updateAdditionalUI(feelsLikeValue, 
                        humidityValue,
                        windValue,
                        visibilityValue,
                        uvIndexValue,
                        pressureValue);

  } catch (error) {

    alert("Incorrect City name. Provide a valid location.");
    console.log("Something went wrong, ", error);

  } finally {
    userLocation.value = "";
  }
}

function updateUI(currTemp, currCity, currDate, currIcon, currCondition) {
  temp.innerText = currTemp + "°";
  city.innerText = currCity;
  dateField.innerText = currDate;
  icon.src = currIcon;
  weather.innerText = currCondition;
}

function updateAdditionalUI(feelsLikeValue,
                            humidityValue,
                            windValue,
                            visibilityValue,
                            uvIndexValue,
                            pressureValue)
{

  feelsLike.innerText = feelsLikeValue + "°";
  humidity.innerText = humidityValue + " %";
  wind.innerText = windValue + " Km/h";
  visibility.innerText = visibilityValue + " Km";
  uvIndex.innerText = uvIndexValue;
  pressure.innerText = pressureValue + " hPa";
}

fetchData(targetLoc);
