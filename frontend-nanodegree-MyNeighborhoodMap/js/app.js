var locations = [
    {
    id: "element0",
    title: "Torre Flavia",
    location: {
        lat: 41.955469,
        lng: 12.049212
    },
    address: "Via Roma 141",
    city: "Ladispoli, 00055",
    url: "http://www.monumentoditorreflavia.it/",
    isVisible: ko.observable(true),
    wasVisible: true
    },
    {
    id: "element1",
    title: "Castello Odescalchi",
    location: {
        lat: 41.933492,
        lng: 12.102706
    },
    address: "Strada Comunale di Palo 48",
    city: "Ladispoli, 00055",
    url: "http://www.castelloodescalchi.com/",
    isVisible: ko.observable(true),
    wasVisible: true
    },
    {
    id: "element2",
    title: "Necropoli della Banditaccia",
    location: {
        lat: 42.007341,
        lng: 12.103672
    },
    address: "Via della Necropoli 43/45",
    city: "Cerveteri, 00052",
    url: "http://www.tarquinia-cerveteri.it/museo-e-necropoli-di-cerveteri/necropoli",
    isVisible: ko.observable(true),
    wasVisible: true
    },
    {
    id: "element3",
    title: "Castello Santa Severa",
    location: {
        lat: 42.015855,
        lng: 11.957047
    },
    address: "Via del Castello",
    city: "Santa Severa, 00058",
    url: "http://www.regione.lazio.it/santasevera/",
    isVisible: ko.observable(true),
    wasVisible: true
    },
    {
    id: "element4",
    title: "Castello di Ceri",
    location: {
        lat: 41.994505,
        lng: 12.153427
    },
    address: "Piazza Immacolata 36",
    city: "Ceri, 00050",
    url: "http://www.castellodiceri.it/",
    isVisible: ko.observable(true),
    wasVisible: true
    },
    {
    id: "element5",
    title: "Castello Orsini-Odescalchi",
    location: {
        lat: 42.104318,
        lng: 12.177569
    },
    address: "Piazza Mazzini 14",
    city: "Bracciano, 00062",
    url: "http://www.odescalchi.it/",
    isVisible: ko.observable(true),
    wasVisible: true
}];

var map;
var markers = [];

var largeInfoWindow;
var bounds;

function myInitMap() {
    //Check for screen size to eventually hide the search-box panel
    if ($(window).width() <= 1080) {
        showHideSearchBox();
    }
    // Constructor creates a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 41.9553,
            lng: 12.07899
        },
        zoom: 13
    });
    largeInfoWindow = new google.maps.InfoWindow({
        maxWidth: 200
    });
    bounds = new google.maps.LatLngBounds();
    // Creating markers
    setMarkers(locations);
    map.fitBounds(bounds);
}


function setMarkers(locs) {
    for (var i = 0; i < locs.length; i++) {
        var marker = new google.maps.Marker({
            map: map,
            position: locs[i].location,
            title: locs[i].title,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'images/green_m.png',
                size: new google.maps.Size(25, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(12.5, 40)
            },
            id: i,
            infoContent: ''
        });
        locs[i].markerVar = marker;
        markers.push(marker);
        bounds.extend(marker.position);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            //così faccio una richiesta ogni volta che ci clicco non mi piace molto...vabbè!
            map.setCenter(this.getPosition());
            map.setZoom(14);
            populateInfoWindow(this, largeInfoWindow);
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon('images/red_m.png');
        });
        marker.addListener('mouseout', function() {
            this.setIcon('images/green_m.png');
        });
        // Listener for click on elements in the list
        var searchNav = $('#element' + i);
        searchNav.click((function(marker, i) {
            return function() {
                map.setCenter(marker.getPosition());
                map.setZoom(14);
                populateInfoWindow(marker, largeInfoWindow);
            };
        })(locs[i].markerVar, i));
    }
}

function populateInfoWindow(marker, infowindow) {
    marker.infoContent = '<div>' + marker.title + '</div>';
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;

        function getWikiData(word) {
            var WikiUrl = 'http://it.wikipedia.org/w/api.php?action=opensearch&search=' + word + '&format=json&callback=?';

            function call(url) {
                $.getJSON(url, function(data) {
                    console.log("Request Success");
                    parseResponse(data);
                }).fail(function(jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("Request Failed" + err);
                    marker.infoContent += '<div>Request Failed</div>';
                    infowindow.setContent(marker.infoContent);
                    //Second step on fetching data from API: googleStreetView
                    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
                });
            }

            function parseResponse(response) {
                var tag;
                var parag;
                if (typeof response[3][0] == "string") {
                    tag = '<a href="' + response[3][0] + '">' + 'Wiki page!' + '</a><br/>';
                    parag = response[2][0];
                    if (parag.length > 100) parag = parag.substring(0, 100) + '...';
                    tag += '<div>' + parag + '</div><br/>';
                } else {
                    tag = '<div>No Wiki Info found</div><br/>';
                }
                marker.infoContent += tag;
                infowindow.setContent(marker.infoContent);
                //Second step on fetching data from API: googleStreetView
                streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            }
            call(WikiUrl);
        }

        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                //infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                marker.infoContent += ('<div id="pano"></div>');
                infowindow.setContent(marker.infoContent);
                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'), panoramaOptions);
            } else {
                //infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
                marker.infoContent += ('<div>No Street View Found</div>');
                infowindow.setContent(marker.infoContent);
            }
        }

        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        //streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);  //placed elsewhere! At the end of WikiCall
        //Save info from mediawiki api
        getWikiData(marker.title, infowindow);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}

// check for every marker if it must be or not in the map
function setMarkersOnMap() {
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].isVisible() === true) {
            if (!locations[i].wasVisible) {
                locations[i].markerVar.setMap(map);
                locations[i].wasVisible = true;
            }
        } else {
            if (locations[i].wasVisible) {
                locations[i].markerVar.setMap(null);
                locations[i].wasVisible = false;
            }
        }
    }
}

var viewModel = {
    query: ko.observable(''),
};

viewModel.locations = ko.computed(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(locations, function(loc) {
        if (loc.title.toLowerCase().indexOf(search) >= 0) {
            return loc.isVisible(true);
        } else {
            return loc.isVisible(false);
        }
    });
}, viewModel);

ko.applyBindings(viewModel);

// each time a character of the input field changes, i check for markers changes
$("#input").keyup(function() {
    setMarkersOnMap();
});

// the button for show hide the search box
$("#arrow_img").click(showHideSearchBox);

var searchBoxVisible = true;

function showHideSearchBox() {
    if (searchBoxVisible) {
        hideSearchBox();
    } else {
        showSearchBox();
    }
}

function hideSearchBox() {
    searchBoxVisible = false;
    $("#settings-box").animate({
        top: '-395px'
    });
    $("#arrow_img").attr("src", "images/show.png");
}

function showSearchBox() {
    searchBoxVisible = true;
    $("#settings-box").animate({
        top: '0px'
    });
    $("#arrow_img").attr("src", "images/hide.png");
}
