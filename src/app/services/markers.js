
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
      console.log(location);
      if (location.name === center) {
        centerCoord.lat = location.latitude;
        centerCoord.long = location.longitude;
      }
    });
    map.setCenter({lat:centerCoord.lat, lng:centerCoord.long});
    map.setZoom(18);
  }

  newMarkers (map, oms, locationData, locations, locationSet, instaData){
    let data;
    let oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("GET", "http://www.frenzone.us/api/photos", true);
    oReq.send();

    function reqListener(e){
      data = JSON.parse(this.responseText).data;
      if(data.length > instaData.length || instaData === undefined){
        for(let i = data.length - 1; i > instaData.length - 1; i--){
          instaData.push(data[i]);

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
  }

  showAllPhotos (map, oms, locationData, locations, locationSet, instaData){
    this.deleteMarkers(oms);
     for (let i = 0; i < instaData.length; i++) {
      if(instaData[i].location !== null){
        let coords = instaData[i].Location;
        let latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        let image = `${instaData[i].User.profilePicture}`;
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

        let infowindow = new google.maps.InfoWindow();
        let username = instaData[i].User.username;
        let fullName = instaData[i].User.fullname;
        let imageUrl = instaData[i].url;
        let profilePicture = instaData[i].User.profilePicture;
        let convertedTime = moment.unix(instaData[i].instaCreatedTime);
        let displayTime = convertedTime.format("ddd MMM Do, YYYY, hA");
        let timeFromNow = moment(convertedTime).fromNow();
        let locationName = instaData[i].Location.name;

        let description = "picture taken at " + locationName;
        if(instaData[i].description !== null){
          description = instaData[i].description;
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

    // var toggleButton = document.getElementById('toggleButton');

    for (let i = 0; i < instaData.length; i++) {
      if(instaData[i].Location !== null && instaData[i].User.username === username){
          let clickedShowAll;
          if(toggleButton.value === "on"){
            clickedShowAll = instaData[i].instaCreatedTime >= Math.round(new Date()/1000) - inputTime.value;
          console.log("filter by time")
          }
          if(toggleButton.value ==="off"){
            clickedShowAll = true;
            console.log("show everything")
          }



           if(clickedShowAll){
          let coords = instaData[i].Location;
          let latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
          let image = `${instaData[i].User.profilePicture}`;
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
          let infowindow = new google.maps.InfoWindow();
          let username = instaData[i].User.username;
          let fullName = instaData[i].User.fullname;
          let imageUrl = instaData[i].url;
          let profilePicture = instaData[i].User.profilePicture;
          let locationName = instaData[i].Location.name;
          let pictureTime = instaData[i].created_time;
          let convertedTime = moment.unix(instaData[i].instaCreatedTime);
          let displayTime = convertedTime.format("ddd MMM Do, YYYY, hA");
          let timeFromNow = moment(convertedTime).fromNow();
          let description = "picture taken at " + locationName;
          if(instaData[i].description !== null){
            description = instaData[i].description;
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
}
