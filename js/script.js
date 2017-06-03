var celcius = true;
var CF = ["&#8451", "&#8457"];
var weatherCode;
var boolCity = false;

function getLocation() {
    var x = document.getElementById("display");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(searchByPosition);
    } else {
        x.innerHTML = "User does not allow showing their location";
    }
}


function searchByPosition(position) { //Get info from openweathermap.org with position info
    
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var apiCall = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid=c9ce03012313c8c60594c186bedc9c16"
    callApi(apiCall);
    
}

function change() {
    var btnCF = document.getElementById("changeCF");
  
    getLocation();
    if (celcius) {
        celcius = false;
        btnCF.innerHTML = "Change to Celcius - " + CF[0];
    } else {
        celcius = true;
        btnCF.innerHTML = "Change to Fahrenheit - " + CF[1];
    }
}

function getWeatherPic() {
    var y = document.getElementById("weatherImg");
    var picUrl = "http://openweathermap.org/img/w/" + weatherCode + ".png"
    y.src = picUrl;
}
/**
function searchByCity() {
    var city = document.getElementById("cityName").value;
    console.log("city: ", city)
    var apiCall = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c9ce03012313c8c60594c186bedc9c16"
    callApi(apiCall);
    boolCity = true;
}
*/
function callApi(positionUrl){
    var x = document.getElementById("display");
    $.getJSON(positionUrl, function (json) {
        weatherCode = (json.weather["0"].icon).toString();
        if (celcius) {
            tempC = Math.round(((json.main.temp - 32) * 5) / 9);
            x.innerHTML = "The temperature in " + json.name + " is: " + (tempC).toString() + CF[0];
        } else {
            tempC = Math.round(json.main.temp);
            x.innerHTML = "The temperature in " + json.name + " is: " + (tempC).toString() + CF[1];
        }
        getWeatherPic();

    });
}
