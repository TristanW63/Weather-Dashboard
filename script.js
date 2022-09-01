const searchEL = document.getElementById("searchText");
const submitEl = document.getElementById("submit");

let cityEl = searchEL.value;
submitEl.addEventListener("click", function() {
    cityEl = searchEL.value;
    console.log(cityEl)
  })


$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + cityEl + "&units=imperial&appid=42bd4df4c8216e16be280cf95790436b", function(data){

var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
var temp = Math.floor(data.main.temp);
var weather = data.weather[0].main;
document.getElementById("searchText").value;

$('.icon').attr('src', icon);
$('.temp').append(temp);
$('.weather').append(weather);

})