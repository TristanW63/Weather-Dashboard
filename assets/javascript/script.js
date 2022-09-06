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


     //gets coordinates for the UV index
     var apiURLuvi = "https://api.openweathermap.org/data/2.5/uvi?appid=" +
     APIKey +
     "&lat=" +
     response.coord.lat +
     "&lon=" +
     response.coord.lon;

     fetch(apiURLuvi)
  .then(function (response) {
      console.log(response);
      console.log(apiURLuvi);
      var newIndex = [
        //dynamicly displays current UV index and wether or not its good or bad
        $("<span>").text("UV Index: "),
        $("<button>").text(response.value).attr("id", "uv-button"),
      ];
      $(".current-uv").empty();
        $(".current-uv").append(newIndex);
        if (response.value <= 3) {
          //if uv index is low
          $("#uv-button").addClass("btn btn-success");
        } else if (response.value >= 7) {
          //if uv index is high
          $("#uv-button").addClass("btn btn-danger");
        } else $("#uv-button").addClass("btn btn-warning");
      })
      .catch(function (error) {});
  });
}

// displays cureent weather dynamicly
function ForecastCard(data) {
  console.log("data", data);
  var currentDate = data.dt_text;
  var currentDateFormat = moment(currentDate).format("MM/DD/YYYY");
}