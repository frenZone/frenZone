const template = require('./default.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default'
};

export class DefaultCtrl {
  constructor() {
    this.initMap();
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

  var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://api.instagram.com/v1/users/55870965/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=55870965.2c4aaae.e0dd1784350a44838eda4573296a5750';
    document.getElementsByTagName('head')[0].appendChild(script);

  function JSON_CALLBACK(response) {
    map.data.addGeoJson(response);
  }
  var markers = [];
    window.JSON_CALLBACK = function(results) {
    for (var i = 0; i < results.data.length; i++) {
      if(results.data[i].location !== null){
        var coords = results.data[i].location;
        var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        // var image = results.data[i].user.profile_picture;
        var image = 'https://scontent.cdninstagram.com/t51.2885-19/s30x30/14582392_1153156614795077_1774168565260222464_a.jpg';
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: coords.name,
          icon: image
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
  };

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
