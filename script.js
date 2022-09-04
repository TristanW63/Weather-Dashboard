const searchEL = document.getElementById("searchText");
const submitEl = document.getElementById("submit");
const userFormEl = document.getElementById("form1")


var formSubmit = function (event) {
  event.preventDefault();

  var city = searchEL.value.trim();
  var state = searchEL.value.trim();
  var cityState = city + state;
  if (city) {
    getInputText(city);

    searchEL.value = '';

  } else if (state) {
    getInputText(state);

    searchEL.value = '';
  }
};


const API = `42bd4df4c8216e16be280cf95790436b`;
var getInputText = function (city) {
  var apiUrl = `api.openweathermap.org/data/2.5/forecast?q=${city},${state}&appid=${API}`;

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

var gradDate = moment().format('L');;
$("#1a").text(gradDate);
