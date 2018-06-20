//closure to prevent javascript from clashing with other javascript
(function () {

    //bind click listener to location button
    document.getElementById("locationbutton").addEventListener("click", handleFindLocation);

    //bind keyup events for UX purposes
    document.querySelector(".location").addEventListener("keyup", function (event) {
        //enter key
        if (event.keyCode === 13) {
            handleFindLocation();
        }
        //escape key
        if (event.keyCode === 27) {
            document.querySelector(".location").value = '';
        }

    });

    /**
     * Find location
     */
    function handleFindLocation(event) {
        if (event) event.preventDefault();

        var location = document.querySelector('.location').value;

        if (location === '') {
            alert("Please enter a location.");
            return false;
        }

        //get weather from API
        getWeatherFromAPI(document.querySelector('.location').value).then(function (data) {

            //validate amount of results
            if (data.count === 0) {
                alert("No locations found. Please try again");
            }

            var dataList = data.list;

            //create array of location items
            var locationItems = dataList.map(function (location, index) {
                var locationString = location.name + ',' + location.sys.country;
                return "<li data-location='" + locationString + "'><div class='google-map-container' id='map_" + index + "'></div>" + locationString + "</li>";
            });

            //add locationList to DOM
            document.querySelector(".locationList").innerHTML = locationItems.join('');

            //init maps
            dataList.forEach(function (location, index) {
                initGoogleMap(location.coord.lat, location.coord.lon, document.getElementById('map_' + index));
            })

            //bind click events
            Array.prototype.slice.call(document.querySelectorAll(".locationList li")).forEach(function (listItem) {
                listItem.addEventListener("click", handleListItemClick);
            });
        })

    }

    /**
     * Gets weather from weather API
     *
     * @param location {string}
     * @returns {Promise<Response>}
     */
    function getWeatherFromAPI(location) {
        return fetch("https://openweathermap.org/data/2.5/find?q=" + location + "&type=like&sort=population&cnt=30&appid=b6907d289e10d714a6e88b30761fae22&_=1529307976093").then(function (response) {
            return response.json();
        })
    }

    /**
     * Redirect to result HTML when list item is clicked
     * @param event
     */
    function handleListItemClick(event) {
        if (event) event.preventDefault();

        //redirect to other HTML file
        window.location = 'result.html?location=' + event.currentTarget.getAttribute("data-location");
    }

    /**
     * Create Google Map
     *
     * @param lattitude {string}
     * @param longitude {string}
     * @param $el {HTMLElement}
     */
    function initGoogleMap(lattitude, longitude, $el) {

        //get map center
        var mapCenter = new google.maps.LatLng(lattitude, longitude);

        //create map
        var map = new google.maps.Map($el, {
            zoom: 6,
            center: mapCenter,
            disableDefaultUI: true,
            gestureHandling: 'none',
            zoomControl: false,
            styles: [
                {
                    "featureType": "administrative.locality",
                    "elementType": "all",
                    "stylers": [
                        {
                            "hue": "#2c2e33"
                        },
                        {
                            "saturation": 7
                        },
                        {
                            "lightness": 19
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "hue": "#ffffff"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "hue": "#ffffff"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 100
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#bbc0c4"
                        },
                        {
                            "saturation": -93
                        },
                        {
                            "lightness": 31
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "hue": "#bbc0c4"
                        },
                        {
                            "saturation": -93
                        },
                        {
                            "lightness": 31
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "hue": "#bbc0c4"
                        },
                        {
                            "saturation": -93
                        },
                        {
                            "lightness": -2
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#e9ebed"
                        },
                        {
                            "saturation": -90
                        },
                        {
                            "lightness": -8
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "hue": "#e9ebed"
                        },
                        {
                            "saturation": 10
                        },
                        {
                            "lightness": 69
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "hue": "#e9ebed"
                        },
                        {
                            "saturation": -78
                        },
                        {
                            "lightness": 67
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                }
            ]
        });

        //create marker
        new google.maps.Marker({position: mapCenter, map: map});
    }

})();