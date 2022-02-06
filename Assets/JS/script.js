var searchForm = document.querySelector("#search-form");

var searchButton = document.querySelector("#search-button");

var resetButton = document.querySelector("#reset-button");

var searchField = document.querySelector("#search-field");

var formList = document.querySelector("#localList");

var APIID = "Weather Dashboard";

var API

var city;

var apiURL;

var cityList = [];

$(document).ready(function()
{
    var appendCity = JSON.parse(localStorage.getItem('cities'))

    for(const el of appendCity)
    {
        console.log(el);
        var item = document.createElement('li');

        item.textContent = el;

        formList.appendChild(item);
    }
})

resetButton.addEventListener('click', function()
{
    localStorage.clear();

    while (formList.firstChild) {
        formList.removeChild(formList.firstChild);
    }
})

searchForm.addEventListener('submit', function(event)
{
    event.preventDefault();
    city = searchField.value;
    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&id=${APIID}&APPID=${API}`;
    console.log(apiURL);
    fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

    cityList.push(city);

    var item = document.createElement('li');

    item.textContent = city;

    formList.appendChild(item);

    localStorage.setItem('cities', JSON.stringify(cityList));
}
)
