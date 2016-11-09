import { PhotosServiceName } from '../services/photos';

const template = require('./friends.html');

export const FriendsCtrlName = 'FriendsCtrl';

export const FriendsCtrlState = {

  url: '/friends',
  template,
  controller: FriendsCtrlName,
  controllerAs: 'friends'
};

export const FriendsCtrl = [
  '$scope',
  PhotosServiceName,
  '$sce',
  class FriendsCtrl {
    constructor($scope, PhotosService,$sce) {
      $scope.photos = [];
      $scope.friends =[];
      $scope.locations=[];
      $scope.getUserPhotos = this.getUserPhotos;

      PhotosService.getPhotos().success((photos)=>{
        for (var i = 0; i < photos.data.length; i++){
          if(photos.data[i].type === 'video'){
            photos.data[i].videos.standard_resolution.url = $sce.trustAsResourceUrl(photos.data[i].videos.standard_resolution.url);
          }
        }
      $scope.photos = photos;
      });

      PhotosService.getFriends()
      .success((friends) => {
        $scope.friends = friends.data;
      });

      PhotosService.getLocation()
      .success((locations) => {
        $scope.locations = locations.data;
      });
      //added from google map api data
      this.initMap();
    }

//google map api data start

  initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {


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

    //casey
    var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://api.instagram.com/v1/users/55870965/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=55870965.2c4aaae.e0dd1784350a44838eda4573296a5750';
    document.getElementsByTagName('head')[0].appendChild(script);

    //frenzone
    var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://api.instagram.com/v1/media/search?lat=21.2922381&lng=-157.8237538&distance=5000&callback=JSON_CALLBACK&access_token=4120053413.02eff85.2d5b2829f52046549e0f2a92ac0655c6';
    document.getElementsByTagName('head')[0].appendChild(script);

    //renee
    var script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://api.instagram.com/v1/users/1639523138/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=1639523138.14ebd44.ce64b66e004a4bd380c6ea8731527d4f';
    document.getElementsByTagName('head')[0].appendChild(script);

  var oms = new OverlappingMarkerSpiderfier(map);

  var iw = new google.maps.InfoWindow();
  oms.addListener('click', function(marker, event) {
    iw.setContent(marker.desc);
    iw.open(map, marker);
  });

  oms.addListener('spiderfy', function(markers) {
    iw.close();
  });

  function JSON_CALLBACK(response) {
    map.data.addGeoJson(response);

  }
  var markers = [];
  window.JSON_CALLBACK = function(results) {
    for (var i = 0; i < results.data.length; i++) {
      if(results.data[i].location !== null){
        var coords = results.data[i].location;
        var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        var image = results.data[i].user.profile_picture;
        // var image = 'https://scontent.cdninstagram.com/t51.2885-19/150x150/14582392_1153156614795077_1774168565260222464_a.jpg';
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: coords.name,
          icon: {
            url: image,
            scaledSize: new google.maps.Size(40, 40),
          }
        });
        var infowindow = new google.maps.InfoWindow();
        marker.desc = '<div id="locationPicture">'+
          `<img src="${results.data[i].images.thumbnail.url}"></img>`+
          '</div>';

        oms.addMarker(marker);
        google.maps.event.trigger(map, 'resize');
      }
    }
    map.setCenter(honolulu);
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

//google map api end


  }
];