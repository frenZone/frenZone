import { PhotosServiceName } from '../services/photos';

const template = require('./default.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default'
};

export const DefaultCtrl = [
  '$scope',
  PhotosServiceName,
  '$sce',
  class DefaultCtrl {
    constructor($scope, PhotosService,$sce) {
      $scope.friends =[];
      $scope.getUserPhotos = this.getUserPhotos;
      PhotosService.getFriends()
      .success((friends) => {
        $scope.friends = friends.data;
      });
      this.initMap();
    }

    getUserPhotos(id){
      console.log("####",id)
    }

  initMap() {
  // Styles a map in night mode.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.3069, lng: -157.8583},
    zoom: 14,
    disableDefaultUI: true,
    styles: [
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
    ]
  });

  var infoWindow = new google.maps.InfoWindow({map: map});

  function setCoords(coordObj){
    var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = `https://api.instagram.com/v1/media/search?lat=${coordObj.lat}&lng=${coordObj.lng}&distance=5000&callback=JSON_CALLBACK&access_token=175690487.02eff85.fd0b74d4431044a9b82fc9a925d036ad`;
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log("lat" ,coordObj.lat);
    // console.log("lng",lng);
  }



  function JSON_CALLBACK(response) {
    map.data.addGeoJson(response);

  }
  var markers = [];
    window.JSON_CALLBACK = function(results) {
    for (var i = 0; i < results.data.length; i++) {
      if(results.data[i].location !== null){
        var coords = results.data[i].location;
        var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: coords.name
        });
        var infowindow = new google.maps.InfoWindow();
        var content = '<div id="locationPicture">'+
          `<img src="${results.data[i].images.thumbnail.url}"></img>`+
          '</div>';

        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
          return function() {
              infowindow.setContent(content);
              infowindow.open(map,marker);
          };
        })(marker,content,infowindow));
      }
    }

    google.maps.event.addDomListener(window, 'load', initialize);

  };

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setCoords(pos)
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