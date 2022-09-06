const searchEL = document.getElementById("searchText");
const submitEl = document.getElementById("submit");
const userFormEl = document.getElementById("form1")
var skillsListEl = $('#skills-list');

var savedSearches = function (searched) {
  var listEl = $('<li>');
  var listDetail = searched.concat('');
  listEl.addClass('list-group-item').text(listDetail);
  listEl.appendTo(skillsListEl);
};





var formSubmit = function (event) {
  event.preventDefault();

  var city = searchEL.value.trim();

  if (city) {
    getInputText(city);

    searchEL.value = '';
  } if (!city) {
    console.log('You need to fill out the form!');
    return;
  }
  savedSearches(city);
};

var getInputText = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=42bd4df4c8216e16be280cf95790436b&cnt=40';

  fetch(apiUrl)
  .then(response => response.json()) 
    .then(forecast => {
      forecast.list.forEach(day => {

        var icon = "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
var temp = Math.floor(day.main.temp) + "°F";
 var humidity = day.main.humidity + "%";
 var wind = day.wind.speed;
 document.getElementById("searchText").value;
console.log(forecast.length)


 $('.icon').attr('src', icon);
 $('.temp').empty().append(temp);
 $('.humidity').empty().append(humidity);
$('.city').empty().append(city);
$('.wind').empty().append(wind);
        })
    })

      }

userFormEl.addEventListener('submit', formSubmit);

var gradDate = moment().format('L');;
$("#1a").text(gradDate);
