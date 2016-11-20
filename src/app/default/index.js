import { PhotosServiceName } from '../services/photos';
import { MapServiceName } from '../services/map';
import { MarkerServiceName } from '../services/markers';

const template = require('./default.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default'
};

function setMapOnAll(map) {
  for (var i = 0; i < oms.a.length; i++) {
    oms.a[i].setMap(map);
  }
}

// function centerMap(center){
//    let centerCoord ={};
//     locationData.forEach((location) => {
//     if (location.name === center) {
//       centerCoord.lat = location.latitude;
//       centerCoord.long = location.longitude;
//     }
//   });
//   map.setCenter({lat:centerCoord.lat, lng:centerCoord.long});
//   map.setZoom(18);
// }

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  oms.a = [];
}

const showLocationMarkers = function(){

  deleteMarkers();
};

// const showAllPhotos = function (){
//   deleteMarkers();
//    for (var i = 0; i < instaData.length; i++) {
//     if(instaData[i].location !== null){
//       var coords = instaData[i].location;
//       var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
//       var image = instaData[i].user.profile_picture;
//       // var image = 'https://scontent.cdninstagram.com/t51.2885-19/150x150/14582392_1153156614795077_1774168565260222464_a.jpg';
//       var marker = new google.maps.Marker({
//         position: latLng,
//         map: map,
//         animation: google.maps.Animation.DROP,
//         title: coords.name,
//         id: 'marker',
//         icon: {
//           url: image,
//           scaledSize: new google.maps.Size(40, 40),
//           optimized:false
//         }
//       });
//       var infowindow = new google.maps.InfoWindow();
//       marker.desc = '<div id="locationPicture">'+
//         `<img src="${instaData[i].images.thumbnail.url}"></img>`+
//         '</div>';

//       oms.addMarker(marker);
//     }
//     map.setCenter({lat: 21.308743338531, lng: -157.80870209358});
//   }
// };


// const getUserPhotos = function (username){
//   deleteMarkers();
//     var inputTime = document.getElementById('inputTime');
//     var inputDisplay = document.getElementById('inputDisplay');
//     var displayOutPut = document.getElementById('displayOutPut');
//     var numberHours =(Math.round((inputTime.value/3600)) + " hours");
//     if(inputTime.value >= 86400){
//       numberHours =(Math.round((inputTime.value/86400)) + " days");
//     }
//     inputDisplay.innerHTML = numberHours + " ago";
//     for (var i = 0; i < instaData.length; i++) {
//       if(instaData[i].location !== null && instaData[i].user.id === username){
//         if(instaData[i].created_time >= (Math.round(new Date()/1000)-inputTime.value)){
//           var coords = instaData[i].location;
//           var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
//           var image = instaData[i].user.profile_picture;
//           // var image = 'https://scontent.cdninstagram.com/t51.2885-19/150x150/14582392_1153156614795077_1774168565260222464_a.jpg';
//           var marker = new google.maps.Marker({
//             position: latLng,
//             map: map,
//             animation: google.maps.Animation.DROP,
//             title: coords.name,
//             id: 'marker',
//             icon: {
//               url: image,
//               scaledSize: new google.maps.Size(40, 40),
//               optimized:false
//             }
//           });
//           var infowindow = new google.maps.InfoWindow();
//           marker.desc = '<div id="locationPicture">'+
//             `<img src="${instaData[i].images.thumbnail.url}"></img>`+
//             '</div>';

//           oms.addMarker(marker);
//         }
//       map.setCenter({lat: 21.308743338531, lng: -157.80870209358});
//     }
//   }
// };


export const DefaultCtrl = [
  '$scope',
  PhotosServiceName,
  MapServiceName,
  MarkerServiceName,
  '$sce',
  class DefaultCtrl {
    constructor($scope, PhotosService, MapService, MarkerService, $sce) {
      $scope.friends =[];
      $scope.instaData = MapService.getInstaData();
      $scope.locationData= MapService.getLocationData();
      $scope.locations = MapService.getLocations();

      MapService.initMap();
      //casey
      MapService.getData('https://api.instagram.com/v1/users/55870965/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=55870965.2c4aaae.e0dd1784350a44838eda4573296a5750');

      //aaron
      MapService.getData('https://api.instagram.com/v1/users/175690487/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=175690487.02eff85.fd0b74d4431044a9b82fc9a925d036ad');

      //frenzone
      MapService.getData('https://api.instagram.com/v1/media/search?lat=21.2922381&lng=-157.8237538&distance=5000&callback=JSON_CALLBACK&access_token=4120053413.02eff85.2d5b2829f52046549e0f2a92ac0655c6');

      //renee
      MapService.getData('https://api.instagram.com/v1/users/1639523138/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=1639523138.14ebd44.ce64b66e004a4bd380c6ea8731527d4f');

      //JP
      MapService.getData('https://api.instagram.com/v1/users/196312792/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=196312792.0f4f10a.e1911280307a478fb82448f6d6282be8');

      $scope.map = MapService.getMap();
      $scope.centerMap = MarkerService.centerMap.bind(this, $scope.map, $scope.locationData);

      MapService.update = function () {
        $scope.instaData = this.instaData;
        $scope.locationData = this.locationData;
        $scope.locations = this.locations;
      };
      $scope.onChange = function (){
        var numberHours =(Math.round(($scope.inputTime/3600)) + " hours");
        if($scope.inputTime >= 86400){
          numberHours =(Math.round(($scope.inputTime/86400)) + " days");
        }
        $scope.inputTimeDisplay = numberHours + " ago";
      };


      $scope.logout = function (){
        console.log(window.localStorage)
      }


      PhotosService.getFriends()
      .success((friends) => {
        $scope.friends = friends.data;
      });

    }
  }

];