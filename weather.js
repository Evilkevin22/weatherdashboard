function locationStringToAPIurl() {

    var actuallocation = document.querySelector('.location').value;
    const apicall = "http://api.openweathermap.org/data/2.5/weather?q=" + actuallocation + "+&units=metric&appid=bcee471f1029473600bd68a8d14c4304";
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
        console.log(jsonfind);
        console.log(jsonfind.list.length);
        var locationItems = "";
        var locationItem = "";

        for (var i = 0; i < jsonfind.list.length; i++) {
            var locationString = String(jsonfind.list[i].name + ',' + jsonfind.list[i].sys.country);
            var locationItem = "<li><div id='item" + String(i) + "'></div>" + locationString + "</li>";
            locationItems = locationItems + locationItem;

            console.log(jsonfind.list[i].coord.lat);

        }

        document.querySelector(".locationList").innerHTML = locationItems;

        for (var i = 0; i < jsonfind.list.length; i++) {
            initMap(jsonfind.list[i].coord.lat, jsonfind.list[i].coord.lon, ("item" + String(i) ));
        }

        document.querySelector("li").onclick = function (e) {

            var pickedLocation = e.srcElement.innerHTML;
            pickedLocation = pickedLocation.replace(/(<([^>]+)>)/ig, "");
            pickedLocation = pickedLocation.replace("Map DataMap data ©2018 GoogleMap DataMap data ©2018 GoogleMap data ©2018 GoogleTerms of UseReport a map errorMapTerrainSatelliteLabels", "");
            var pickedLocationAPIcall = "http://api.openweathermap.org/data/2.5/weather?q=" + pickedLocation + "+&units=metric&appid=bcee471f1029473600bd68a8d14c4304";
            appenddata(pickedLocationAPIcall);


        }


    })
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