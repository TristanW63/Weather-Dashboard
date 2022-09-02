const searchEL = document.getElementById("searchText");
const submitEl = document.getElementById("submit");
const userFormEl = document.getElementById("form1")

var formSubmit = function (event) {
  event.preventDefault();

  var city = searchEL.value.trim();

  if (city) {
    getInputText(city);

    searchEL.value = '';
  }
};

var getInputText = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=42bd4df4c8216e16be280cf95790436b';

  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
var temp = Math.floor(data.main.temp) + "°F";
 var humidity = data.main.humidity + "%";
 var wind = data.wind.speed;
 document.getElementById("searchText").value;



 $('.icon').attr('src', icon);
 $('.temp').empty().append(temp);
 $('.humidity').empty().append(humidity);
$('.city').empty().append(city);
$('.wind').empty().append(wind);
      });
    }
  });
};

userFormEl.addEventListener('submit', formSubmit);

var gradDate = moment().subtract(10, 'days').calendar();;
$("#1a").text(gradDate);
