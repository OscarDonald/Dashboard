function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}
// Geolocation
let userLatitude;
let userLongitude;

function successCallback(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;

  fetchWeatherData();
}

const errorCallback = (error) => {
  console.log(error);
};

// Något med denna är långsamt, funkar oftast men får felkod
// i konsolen då resterande kod körs före.
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
  timeout: 10000,
});

async function fetchWeatherData() {
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${userLatitude}&lon=${userLongitude}&units=metric&lang=sv&appid=cc37c96fbfc450a3f6907818ae1b614f`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    
    // Skapar en const för att lagra värden för varje iteration
    const weatherData = [];
    for (let i = 0; i <= 16; i += 8) {
      // Ta ut data

      var temperature = data.list[i].main.temp;
      var windSpeed = data.list[i].wind.speed;
      var weatherDescription = data.list[i].weather[0].description;
      var weatherIcon = data.list[i].weather[0].icon;
      var date = new Date(data.list[i].dt_txt).toLocaleDateString("sv-SE");
      weatherData.push({
        temperature,
        windSpeed,
        weatherDescription,
        date,
        weatherIcon,
      });
    }

    // Visa informationen på sidan
    displayWeatherInfo(weatherData);
    
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeatherInfo(weatherData) {
  // Hämta containern från html
  const weatherInfoContainer = document.getElementById("weatherInfo");

  // Loopa igenom varje objekt i weatherData
  weatherData.forEach(
    ({ temperature, windSpeed, weatherDescription, date, weatherIcon }) => {
      // Skapar en const för url till backgrundsbild
      const weatherUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

      // Skicka ut i html
      weatherInfoContainer.innerHTML += `
      <div class= "time-container">
        <div class="date">${date} </div>
        <div class= "stats">
          <div class="weatherIcon"> <img src="${weatherUrl}" alt="${weatherIcon}"></div>
          <div class="temperature">${roundToHalf(temperature)} °C</div>
          <div class="windSpeed">${roundToHalf(windSpeed)} m/s</div>
          <div class="description">${weatherDescription}</div>
        </div> </div>
      `;
    }
  );
}

fetchWeatherData();
