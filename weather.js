function locationStringToAPIurl(location) {

    const apicall = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "+&units=metric&appid=bcee471f1029473600bd68a8d14c4304";
    appenddata(apicall);

}

function findLocation() {

    var locationname = document.querySelector('.location').value;
    const apifind = "https://openweathermap.org/data/2.5/find?q=" + locationname + "&type=like&sort=population&cnt=30&appid=b6907d289e10d714a6e88b30761fae22&_=1529307976093";
    displayLocations(apifind);
}


function displayLocations(apifind) {

    fetch(apifind).then(function (response) {
        return response.json();
    }).then(function (data) {
        var jsonfind = data;
        var locationItems = "";
        var locationItem = "";

        for (var i = 0; i < jsonfind.list.length; i++) {
            var locationString = String(jsonfind.list[i].name + ',' + jsonfind.list[i].sys.country);
            var locationItem = "<li data-location='" + locationString + "' class='" + locationString + "'><div id='item" + String(i) + "'></div>" + locationString + "</li>";
            locationItems = locationItems + locationItem;
            console.log(locationString);

        }

        document.querySelector(".locationList").innerHTML = locationItems;

        for (var i = 0; i < jsonfind.list.length; i++) {
            initMap(jsonfind.list[i].coord.lat, jsonfind.list[i].coord.lon, ("item" + String(i)));
        }

        Array.prototype.slice.call(document.querySelectorAll(".locationList li")).forEach(function (listItem) {
            listItem.addEventListener("click", handleListItemClick);
        });
    })
}

function handleListItemClick(event) {
    if (event) event.preventDefault();
    var clickedItemLocation = event.currentTarget.getAttribute("data-location");
    console.log(clickedItemLocation);
    locationStringToAPIurl(clickedItemLocation);
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

function initMap(lat, long, mapcontainer) {
    // The location of Uluru
    console.log([lat, long, mapcontainer]);
    var mapcenter = new google.maps.LatLng(lat, long);
    // The map, centered
    var map = new google.maps.Map(
        document.getElementById(mapcontainer), {zoom: 4, center: mapcenter});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: mapcenter, map: map});
}


document.querySelector(".location").addEventListener("keyup", function (event) {
    //enter key
    if (event.keyCode === 13) {
        findLocation();
    }
    //escape key
    if (event.keyCode === 27) {
        document.querySelector(".location").value = '';
    }
});