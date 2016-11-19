export const MapServiceName = 'map';

var map;
const locationData = [];
const instaData = [];
let locations = [];
let locationSet = new Set();
var oms;
var honolulu = {lat: 21.306900, lng: -157.858300};
var nightModeMap = new google.maps.StyledMapType(
  [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
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
    }
  ],
  {name: 'Night Mode'});

// function JSON_CALLBACK(response) {
//   map.data.addGeoJson(response);
// }


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

    getMap () {
      return this.map;
    }

    setMapOnAll (map) {
      for (var i = 0; i < oms.a.length; i++) {
        oms.a[i].setMap(map);
      }
    }

    getData (url){
      this.$http.jsonp(url)
        .success((data) => {
          for (var i = 0; i < data.data.length; i++) {
            if(data.data[i].location !== null){
              instaData.push(data.data[i]);
            }
          }

          for (var i = 0; i < data.data.length; i++) {
            if(data.data[i].location !== null){
              var coords = data.data[i].location;
              var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
              var image = `https://circle-image-as-a-service-juuyhmkiiy.now.sh/?url=${data.data[i].user.profile_picture}`;
              var marker = new google.maps.Marker({
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
              marker.desc = '<div id="locationPicture">'+
                '<h1>' + `${data.data[i].user.username}`+ `(${data.data[i].user.full_name})` + '</h1>' +
                `<img src="${data.data[i].images.low_resolution.url}"></img>`+
                '<p>' + `${data.data[i].caption.text}` + '</p>' +
                '</div>';
              locationData.push(data.data[i].location);
              oms.addMarker(marker);
            }
          }
          this.updateLocations();
        });
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
          mapTypeIds: ['roadmap', 'night_map', 'satellite', 'hybrid']
        }
      });

      map.mapTypes.set('night_map', nightModeMap);
      map.setMapTypeId('night_map');

      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
      searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
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

      var infoWindow = new google.maps.InfoWindow({map: map});
      var iw = new google.maps.InfoWindow();
      oms= new OverlappingMarkerSpiderfier(map);

      oms.addListener('click', function(marker, event) {
        iw.setContent(marker.desc);
        iw.open(map, marker);
      });

      oms.addListener('spiderfy', function(markers) {
        iw.close();
      });
      google.maps.event.trigger(map, 'resize');
      map.setCenter(honolulu);


      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

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
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }
  }
];
