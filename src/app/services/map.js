export const MapServiceName = 'map';

export  let currentLocation = {};

let map;
const locationData = [];
const instaData = [];
let locations = [];
let locationSet = new Set();
let oms;
let honolulu = {lat: 21.306900, lng: -157.858300};

let lightModeMap = new google.maps.StyledMapType(
  [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},
  {"saturation":43.400000000000006},
  {"lightness":37.599999999999994},
  {"gamma":1}]},
  {"featureType":"road.highway","stylers":[{"hue":"#FFC200"},
  {"saturation":-61.8},
  {"lightness":45.599999999999994},{"gamma":1}]},
  {"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},
  {"saturation":-100},
  {"lightness":51.19999999999999},
  {"gamma":1}]},
  {"featureType":"road.local","stylers":[{"hue":"#FF0300"},
  {"saturation":-100},
  {"lightness":52},
  {"gamma":1}]},
  {"featureType":"water","stylers":[{"hue":"#0078FF"},
  {"saturation":-13.200000000000003},
  {"lightness":2.4000000000000057},
  {"gamma":1}]},
  {"featureType":"poi","stylers":[{"hue":"#00FF6A"},
  {"saturation":-1.0989010989011234},
  {"lightness":11.200000000000017},
  {"gamma":1}]
  }],
  {name: 'Light Mode'});

let nightModeMap = new google.maps.StyledMapType(
  [{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }],
  {name: 'Night Mode'});

let greyScaleModeMap = new google.maps.StyledMapType(
  [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#050505"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#fef3f3"
            },
            {
                "weight": "3.01"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#0a0a0a"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#fffbfb"
            },
            {
                "weight": "3.01"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#a1a1a1"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#292929"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#202020"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#0006ff"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "13"
            },
            {
                "gamma": "0.00"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#686868"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#8d8d8d"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#353535"
            },
            {
                "lightness": "6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": "3.45"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d0d0d0"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "2"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#999898"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#383838"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#faf8f8"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
  ],  {name: 'Greyscale'});

export const MapService = [
'$http',
  class MapService {

    constructor($http){
      this.locationData = locationData;
      this.instaData = instaData;
      this.locations = locations;
      this.map = map;
      this.oms = oms;
      this.$http = $http;

    }

    getLocationData () {
      return this.locationData;
    }

    getInstaData () {
      return this.instaData;
    }

    getLocations () {
      return this.locations;
    }
    getLocationSet () {
      return this.locationSet;
    }
    getMap () {
      return this.map;
    }
    getOms () {
      return this.oms;
    }

    setMapOnAll (map) {
      for (let i = 0; i < oms.a.length; i++) {
        oms.a[i].setMap(map);
      }
    }

    getData (){
      let data;
      let oReq = new XMLHttpRequest();
      oReq.onload = reqListener;
      oReq.open("GET", "http://localhost:8080/api/photos", true);
      oReq.send();

      function reqListener(e){
        data = JSON.parse(this.responseText).data;
        for (let i = 0; i < data.length; i++) {
          instaData.push(data[i]);
        }
        for (let i = 0; i < data.length; i++) {
          if(data[i].Location !== null){
            let coords = data[i].Location;
            let latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
            let image = `${data[i].User.profilePicture}`;
            let marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              title: coords.name,
              id: 'marker',
              icon: {
                url: image,
                scaledSize: new google.maps.Size(50, 50),
                optimized:false
              }
            });
            var infowindow = new google.maps.InfoWindow();
            let username = data[i].User.username;
            let fullName = data[i].User.fullname;
            let imageUrl = data[i].url;
            let profilePicture = data[i].User.profilePicture;
            let locationName = data[i].Location.name;
            let description = "picture taken at " + locationName;
            if(data[i].caption !== null){
              description = data[i].description;
            }

            marker.desc = '<div id="locationPicture">'+
              `<img id='profile' src = "${profilePicture}">` +
              '<h1>' + `${username}`+ `(${fullName})` + '</h1>' +
              '<h3>' + '<img src = "./img/frenzone-icon.svg" width="20px" height="20px" >'+ ' ' +  locationName + '</h3>'+
              `<img src="${imageUrl}"></img>`+
              '<p>' + `${description}` + '</p>' +
              '</div>';
            let location = data[i].Location;
            location.username = data[i].User.username;
            locationData.push(data[i].Location);
            oms.addMarker(marker);
          }
        }
        locations.length = 0;
        locationData.map((lctn) => {
          locationSet.add(lctn.name);
        });
        [...locationSet].forEach((location) => {
          locations.push(location);
        });

        locations.sort((a,b) => {
          if(a<b) return -1;
          if(a>b) return 1;
          return 0;
        });
        this.oms = oms;
      }

    }

    update(){}

    updateLocations (){
      locations.length = 0;
      locationData.map((lctn) => {
        locationSet.add(lctn.name);
      });
      [...locationSet].forEach((location) => {
        locations.push(location);
      });

      locations.sort((a,b) => {
        if(a<b) return -1;
        if(a>b) return 1;
        return 0;
      });
      this.oms = oms;
      this.update();
    }

    initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: ['light_map', 'night_map', 'greyscale' ,'satellite', 'hybrid']
        }
      });

      map.mapTypes.set('night_map', nightModeMap);
      map.mapTypes.set('light_map', lightModeMap);
      map.mapTypes.set('greyscale', greyScaleModeMap);
      map.setMapTypeId('light_map');

      let input = document.getElementById('pac-input');
      let searchBox = new google.maps.places.SearchBox(input);
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
      searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
        // For each place, get the icon, name and location.
        let bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

      let infoWindow = new google.maps.InfoWindow({map: map});
      let iw = new google.maps.InfoWindow();
      oms = new OverlappingMarkerSpiderfier(map);
      oms.addListener('click', function(marker, event) {
        iw.setContent(marker.desc);
        iw.open(map, marker);
      });

      oms.addListener('spiderfy', function(markers) {
        iw.close();
      });
      this.oms = oms;
      google.maps.event.trigger(map, 'resize');
      map.setCenter(honolulu);


      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          currentLocation.lat = pos.lat;
          currentLocation.lng = pos.lng;
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
      this.map = map;
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }
  }
];