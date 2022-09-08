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
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + (myCity || "Nashville") + "&units=imperial&appid=" + APIKey;

  fetch(apiUrl)
  .then(function (response) {
      console.log(response);
      console.log(apiUrl);
      response.json().then(function (data) {
      //gets city name from response
     $(".main_card_city").text(data.name);
     $(".date").html(
      //gets date from response
      "&nbsp;(" + moment.unix(data.dt).format("MM/DD/YYYY") + `)`
     );
     //gets and displays current weather icon
     $(".weather-icon").attr(
      "src",
      "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
     );
      //gets and displays current weather data
      var temp = Math.floor(data.main.temp) + "°F";
     $(".current-temp").html("Temperature: " + temp );
     $(".current-humid").text("Humidity: " + data.main.humidity + "%");
     $(".current-wind").text("Wind Speed: " + data.wind.speed + " MPH");


     //gets coordinates for the UV index
     var apiURLuvi = "https://api.openweathermap.org/data/2.5/uvi?appid=" +
     APIKey +
     "&lat=" +
     data.coord.lat +
     "&lon=" +
     data.coord.lon;

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
})
}

// displays forecasted weather dynamicly
function ForecastCard(data) {
  console.log("data", data);
  var currentDate = data.dt_text;
  var currentDateFormat = moment(currentDate).format("MM/DD/YYYY");

  var temp = Math.floor(data.main.temp) + "°F";
  var avgHumidity = data.main.humidity;
  var icon = $("<img>").attr(
    "src",
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
  );
  console.log(icon[0]);
  var iconImage = icon[0].outerHTML;
  var obj = {
    date: currentDateFormat,
    img: iconImage,
    temp: "Temperature: " + temp,
    humidity: "Humidity: " + avgHumidity + "%",
  };

  console.log("Current Date:", currentDate);
  console.log("Date of Index:", moment(currentDate).format("MM/DD/YYYY"));

  return `<div class="card forecast">
  <div class="card-body">
  <h5>${obj.date}</h5>
  <div>${obj.img}</div>
  <div> ${obj.temp} </div>
  <div>${obj.humidity}</div>
</div>
</div>`;
}

//fetching and displaying five day forecast
function displayFiveDayForecast(myCity) {
  var apiURlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + (myCity || "Nashville") + "&units=imperial&appid=" + APIKey;

  fetch(apiURlForecast)
  .then(function (response) {
    response.json().then(
      function (data) {
        $("#forecast-row").empty();
        for (var i = 4; i < data.list.length; i += 8) {
      var date = data.list[i];
     
        var div = $("<div class='col-md-2'>").html(ForecastCard(data.list[i]));

        $("#forecast-row").append(div);
      
        }  
  });
})
}


function recordSearchHistory() {
  $(".list-group").empty();
  for (var i = 0; i < searchHistory.length; i++){
    console.log(searchHistory[i]);
    var search = $("<li>");
    search.addClass("city list-group-item");
    search.attr("data-name", searchHistory[i]);
    search.text(searchHistory[i]);
    $(".list-group").append(search);
  }
  displayWeather();
}
$("#add-city").on("click", function (event) {
  event.preventDefault();
  $("#weather-results").attr("style", "display: block");
  $("#search-history-results").attr("style", "display: block");
  var city = $("#city-input").val().trim();
  var queryURLcurrent =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURLcurrent,
    method: "GET",
  })
    .then(function (response) {
      if (response.name) {
        searchHistory.push(response.name);
        localStorage.setItem("search-name", JSON.stringify(searchHistory));
        recordSearchHistory();
      } else {
        $("#city-input").val("");
      }
    })
    .catch(function (error) {
      $("#city-input").val("");
    });
});

$(document).on("click", ".city", displayWeather);

recordSearchHistory();