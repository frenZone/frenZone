
import {currentLocation} from '../services/map';

let moment = require('moment');

export const MarkerServiceName = 'marker';
export class MarkerService {
  setMapOnAll(map, oms) {
    for (let i = 0; i < oms.a.length; i++) {
      oms.a[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers(oms) {
    this.setMapOnAll(null, oms);
    oms.a.length = 0;
  }

  // Shows any markers currently in the array.
  showMarkers(map) {
    this.setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers(oms) {
    this.clearMarkers(oms);
    oms.a = [];
  }

  showLocationMarkers (){
    deleteMarkers();
  }

  centerMap (map, locationData, center){
    let centerCoord ={};
    locationData.forEach((location) => {
      if (location.name === center) {
        centerCoord.lat = location.latitude;
        centerCoord.long = location.longitude;
      }
    });
    map.setCenter({lat:centerCoord.lat, lng:centerCoord.long});
    map.setZoom(18);
  }

  showAllPhotos (map, oms, locationData, locations, locationSet, instaData){
    this.deleteMarkers(oms);
     for (let i = 0; i < instaData.length; i++) {
      if(instaData[i].location !== null){
        let coords = instaData[i].location;
        let latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        let image = `https://circle-image-as-a-service-juuyhmkiiy.now.sh/?url=${instaData[i].user.profile_picture}`;
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: coords.name,
          id: 'marker',
          icon: {
            url: image,
            optimized:false
          }
        });
        let infowindow = new google.maps.InfoWindow();
        let username = instaData[i].user.username;
        let fullName = instaData[i].user.full_name;
        let imageUrl = instaData[i].images.low_resolution.url;
        let profilePicture = instaData[i].user.profile_picture;
        let convertedTime = moment.unix(instaData[i].created_time);
        let displayTime = convertedTime.format("ddd MMM Do, YYYY, hA");
        let timeFromNow = moment(convertedTime).fromNow();
        let locationName = instaData[i].location.name;
        let description = "picture taken at " + locationName;
        if(instaData[i].caption !== null){
          description = instaData[i].caption.text;
        }
        marker.desc = '<div id="locationPicture">'+
          `<img id='profile' src = "${profilePicture}">` +
          '<h1>' + `${username}`+ `(${fullName})` + '</h1>' +
          '<h3>' + '<img src = "./img/frenzone-icon.svg" width="20px" height="20px" >'+ ' ' +  locationName + '</h3>'+
          `<img src="${imageUrl}"></img>`+
          '<p>' + `${description}` + '</p>' +
          '<p>' + `${displayTime}` + '</p>' +
          '<p>' + `${timeFromNow}` + '</p>' +

          '</div>';
        oms.addMarker(marker);
      }
      map.setCenter({lat: currentLocation.lat, lng: currentLocation.lng});
      // map.setCenter({lat: 21.308743338531, lng: -157.80870209358});
      locationSet = new Set();
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
    }
  }

  getUserPhotos (map, oms, locationData, locations, locationSet, instaData, username){
    this.deleteMarkers(oms);

    let inputTime = document.getElementById('inputTime');
    let inputDisplay = document.getElementById('inputDisplay');
    let displayOutPut = document.getElementById('displayOutPut');

    for (let i = 0; i < instaData.length; i++) {
      if(instaData[i].location !== null && instaData[i].user.username === username){
        if(instaData[i].created_time >= Math.round(new Date()/1000) - inputTime.value){
        let coords = instaData[i].location;
        let latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        let image = `https://circle-image-as-a-service-juuyhmkiiy.now.sh/?url=${instaData[i].user.profile_picture}`;
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: coords.name,
          id: 'marker',
          icon: {
            url: image,
            optimized:false
          }
        });
        let infowindow = new google.maps.InfoWindow();
        let username = instaData[i].user.username;
        let fullName = instaData[i].user.full_name;
        let imageUrl = instaData[i].images.low_resolution.url;
        let profilePicture = instaData[i].user.profile_picture;
        let locationName = instaData[i].location.name;
        let pictureTime = instaData[i].created_time;
        let convertedTime = moment.unix(instaData[i].created_time);
        let displayTime = convertedTime.format("ddd MMM Do, YYYY, hA");
        let timeFromNow = moment(convertedTime).fromNow();
        let description = "picture taken at " + locationName;
        if(instaData[i].caption !== null){
          description = instaData[i].caption.text;
        }
        marker.desc = '<div id="locationPicture">'+
          `<img id='profile' src = "${profilePicture}">` +
          '<h1>' + `${username}`+ `(${fullName})` + '</h1>' +
          '<h3>' + '<img src = "./img/frenzone-icon.svg" width="20px" height="20px" >'+ ' ' +  locationName + '</h3>'+
          `<img src="${imageUrl}"></img>`+
          '<p>' + `${description}` + '</p>' +
          '<p>' + `${displayTime}` + '</p>' +
          '<p>' + `${timeFromNow}` + '</p>' +

          '</div>';
        oms.addMarker(marker);
      }
      locationSet = new Set();
      locations.length = 0;
      locationData.map((lctn) => {
        if(lctn.username === username){
          locationSet.add(lctn.name);
        }
      });
      [...locationSet].forEach((location) => {
        locations.push(location);
      });
      locations.sort((a,b) => {
        if(a<b) return -1;
        if(a>b) return 1;
        return 0;
      });
     }
    }
  }
}
