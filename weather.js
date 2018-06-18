

function locationStringToAPIurl() {


    var locationname = document.querySelector('.location').value;
    const apicall = "http://api.openweathermap.org/data/2.5/weather?q="+ locationname+"+&units=metric&appid=bcee471f1029473600bd68a8d14c4304";
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

