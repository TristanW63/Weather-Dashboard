var APIKey = "42bd4df4c8216e16be280cf95790436b";


//pulls from local storage andd hides it
var searchHistory = JSON.parse(localStorage.getItem("search-name"));
if (!searchHistory) {
  searchHistory = [];
  $("#search-history-results").css("display", "none");
  $("#weather-results").css("display", "none");
}
console.log(searchHistory);

function displayWeather() {
  var myCity = $(this).attr("data-name") || $("#city-input").val();
  displayCurrentWeather(myCity);
  displayFiveDayForecast(myCity);
}

//gets current weather 
function displayCurrentWeather (myCity) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + APIKey;

  fetch(apiUrl)
  .then(function (response) {
      console.log(response);
      console.log(apiUrl);
      //gets city name from response
     $(".main_card_city").text(response.name);
     $(".date").html(
      //gets date from response
      "&nbsp;(" + moment.unix(response.dt).format("MM/DD/YYYY") + `)`
     );
     //gets and displays current weather icon
     $(".weather-icon").attr(
      "src",
      "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
     );
      //gets and displays current weather data
     var kelvin = response.main.temp;
     var fahrenheit = ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
     $(".current-temp").html("Temperature: " + fahrenheit + "&deg;F");
     $(".current-humid").text("Humidity: " + response.main.humidity + "%");
     $(".current-wind").text("Wind Speed: " + response.wind.speed + " MPH");

