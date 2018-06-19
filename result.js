/**
 * Get parameter from URL by name
 *
 * @source https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 *
 * @param name
 * @param url
 * @returns {*}
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function locationStringToAPIurl(location) {
    const apicall = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "+&units=metric&appid=bcee471f1029473600bd68a8d14c4304";
    appenddata(apicall);
}

function appenddata(apiurl) {
    fetch(apiurl).then(function (response) {
        return response.json();
    }).then(function (data) {
        var jsonfile = data;
        console.log(jsonfile);

        var roundtemp = Math.round(jsonfile.main.temp);

        document.querySelector(".name").innerHTML = jsonfile.name;
        document.querySelector(".temp").innerHTML = roundtemp;
        document.querySelector(".descrip").innerHTML = jsonfile.weather[0].description;

        var prefix = "wi wi-";
        var hour = new Date().getHours();
        var time = "";
        var iconid = jsonfile.weather[0].id;

        if (hour > 6 && hour < 20) {
            time = "day-";
        } else {
            time = "night-";
        }

        var formattedIconClass = prefix + "owm-" + time + iconid,
            formattedIconElement = '<i class="' + formattedIconClass + '"></i>';
        document.querySelector(".icon").innerHTML = formattedIconElement;
    })
}


var urlParameter = getParameterByName('location');
locationStringToAPIurl(urlParameter);