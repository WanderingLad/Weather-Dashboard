var searchForm = document.querySelector("#search-form");

var searchButton = document.querySelector("#search-button");

var resetButton = document.querySelector("#reset-button");

var searchField = document.querySelector("#search-field");

var formList = document.querySelector("#localList");

var clickable;

var APIID = 'edcfa6c11db04ad96a6eaf0dac6ed19';

var API = 'edcfa6c11db04ad96a6eaf0dac6ed19';

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

            $("#main-icon").attr('src',`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`);

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

            $("#card-one-icon").attr('src',`http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`);
            $("#card-one-date").text(moment().add(1, 'day').format("M/DD/YYYY"));
            $("#card-one-temperature").text("Temp: " + data.daily[0].temp.day + "° F");
            $("#card-one-wind-speed").text("Wind: " + data.daily[0].wind_speed + " MPH");
            $("#card-one-humidity").text("Humidity: " + data.daily[0].humidity + "%");

            $("#card-two-icon").attr('src',`http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`);
            $("#card-two-date").text(moment().add(2, 'day').format("M/DD/YYYY"));
            $("#card-two-temperature").text("Temp: " + data.daily[1].temp.day + "° F");
            $("#card-two-wind-speed").text("Wind: " + data.daily[1].wind_speed + " MPH");
            $("#card-two-humidity").text("Humidity: " + data.daily[1].humidity + "%");

            $("#card-three-icon").attr('src',`http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`);
            $("#card-three-date").text(moment().add(3, 'day').format("M/DD/YYYY"));
            $("#card-three-temperature").text("Temp: " + data.daily[2].temp.day + "° F");
            $("#card-three-wind-speed").text("Wind: " + data.daily[2].wind_speed + " MPH");
            $("#card-three-humidity").text("Humidity: " + data.daily[2].humidity + "%");

            $("#card-four-icon").attr('src',`http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`);
            $("#card-four-date").text(moment().add(4, 'day').format("M/DD/YYYY"));
            $("#card-four-temperature").text("Temp: " + data.daily[3].temp.day + "° F");
            $("#card-four-wind-speed").text("Wind: " + data.daily[3].wind_speed + " MPH");
            $("#card-four-humidity").text("Humidity: " + data.daily[3].humidity + "%");

            $("#card-five-icon").attr('src',`http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png`);
            $("#card-five-date").text(moment().add(5, 'day').format("M/DD/YYYY"));
            $("#card-five-temperature").text("Temp: " + data.daily[4].temp.day + "° F");
            $("#card-five-wind-speed").text("Wind: " + data.daily[4].wind_speed + " MPH");
            $("#card-five-humidity").text("Humidity: " + data.daily[4].humidity + "%");
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
