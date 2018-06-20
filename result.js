//closure to prevent javascript from clashing with other javascript
(function () {

    //get parameter from url
    var location = getParameterByName('location');

    //get weather
    getWeatherFromAPI(location).then(function (data) {

        //round temperature to closest integer
        var roundtemp = Math.round(data.main.temp);

        //get weather icon attributes
        var hour = new Date().getHours();
        var time = hour > 6 && hour < 20 ? "day-" : "night-";
        var iconId = data.weather[0].id;
        var formattedIconClass = "wi wi-owm-" + time + iconId;

        //update DOM
        document.querySelector(".name").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = roundtemp + " °";
        document.querySelector(".descrip").innerHTML = data.weather[0].description;
        document.querySelector(".icon").innerHTML = '<i class="' + formattedIconClass + '"></i>';
    });

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

    /**
     * Gets weather from weather API
     *
     * @param location {string}
     * @returns {Promise<Response>}
     */
    function getWeatherFromAPI(location) {
        return fetch("http://api.openweathermap.org/data/2.5/weather?q=" + location + "+&units=metric&appid=bcee471f1029473600bd68a8d14c4304").then(function (response) {
            return response.json();
        })
    }

})();