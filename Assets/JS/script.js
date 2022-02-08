var searchForm = document.querySelector("#search-form");

var searchButton = document.querySelector("#search-button");

var resetButton = document.querySelector("#reset-button");

var searchField = document.querySelector("#search-field");

var formList = document.querySelector("#localList");

var clickable;

var APIID = "Weather Dashboard";

var API

var city;

var apiURL;

var cityList = [];

$(document).ready(function()
{
    if(JSON.parse(localStorage.getItem('cities')))
    {
        var appendCity = JSON.parse(localStorage.getItem('cities'));

        for(const el of appendCity)
        {
            var button = document.createElement('button');

            clickable

            button.textContent = el;

            var item = document.createElement('li');

            item.appendChild(button);

            formList.insertBefore(item, formList.firstChild);

            cityList.push(el);
        }
    }
    
})

resetButton.addEventListener('click', function()
{
    localStorage.removeItem('cities');
    localStorage.clear();

    cityList.clear;

    while (formList.firstChild) {
        formList.removeChild(formList.firstChild);
    }

    location.reload();
})

searchForm.addEventListener('submit', function(event)
{
    event.preventDefault();

    city = searchField.value;

    searchField.value = '';

    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&id=${APIID}&APPID=${API}`;

    fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) 
    {
        console.log(data);

        var lat = data.coord.lat;

        var lon = data.coord.lon;

        apiURL = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&&appid=${API}`;

        $("#city-name-date").text(data.name + moment().format(" (M/DD/YYYY)"));

        fetch(apiURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) 
        {
            console.log(data);

            $("#main-temperature").text("Temp: " + data.current.temp + "° F");

            $("#main-wind-speed").text("Wind: " + data.current.wind_speed + " MPH");

            $("#main-humidity").text("Humidity: " + data.current.humidity + "%");

            $("#uv-index").text("UV Index: " + data.current.uvi);

            if(data.current.uvi <= 2)
            {
                $("#uv-index").css("background-color","green");
            }

            if(data.current.uvi >= 3 && data.current.uvi <= 5)
            {
                $("#uv-index").css("background-color","yellow");
            }

            if(data.current.uvi >= 6 && data.current.uvi <= 7)
            {
                $("#uv-index").css("background-color","orange");
            }

            if(data.current.uvi >= 8 && data.current.uvi <= 10)
            {
                $("#uv-index").css("background-color","red");
            }

            if(data.current.uvi >= 2)
            {
                $("#uv-index").css("background-color","purple");
            }
        })
        
    });

    var button = document.createElement('button');

    button.textContent = city;

    var item = document.createElement('li');

    item.appendChild(button);

    formList.insertBefore(item, formList.firstChild);

    cityList.push(city);

    localStorage.setItem('cities', JSON.stringify(cityList));
}
)

$('#button-div').on('click', 'ul li button', function()
{
    console.log($(this).text());

    searchField.value = $(this).text();

    searchButton.click();
})
