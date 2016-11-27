export const MarkerServiceName = 'marker';
export class MarkerService {
  setMapOnAll(map, oms) {
    for (var i = 0; i < oms.a.length; i++) {
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

  showAllPhotos (map, oms, locationData, locations, locationSet, instaData){
    this.deleteMarkers(oms);
     for (var i = 0; i < instaData.length; i++) {
      if(instaData[i].location !== null){
        var coords = instaData[i].Location;
        var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        var image = `${instaData[i].User.profilePicture}`;
        var marker = new google.maps.Marker({
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
        var infowindow = new google.maps.InfoWindow();
        let username = instaData[i].User.username;
        let fullName = instaData[i].User.fullname;
        let imageUrl = instaData[i].url;
        let profilePicture = instaData[i].User.profilePicture;
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
          '</div>';
        oms.addMarker(marker);
      }
      map.setCenter({lat: 21.308743338531, lng: -157.80870209358});
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
    var inputTime = document.getElementById('inputTime');
    var inputDisplay = document.getElementById('inputDisplay');
    var displayOutPut = document.getElementById('displayOutPut');
    // var numberHours =(Math.round((inputTime.value/3600)) + " hours");
    // if(inputTime.value >= 86400){
    //   numberHours =(Math.round((inputTime.value/86400)) + " days");
    // }
    // inputDisplay.innerHTML = numberHours + " ago";


    for (var i = 0; i < instaData.length; i++) {
      if(instaData[i].Location !== null && instaData[i].User.username === username){
        var coords = instaData[i].Location;
        var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        var image = `${instaData[i].User.profilePicture}`;
        var marker = new google.maps.Marker({
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
        var infowindow = new google.maps.InfoWindow();
        let username = instaData[i].User.username;
        let fullName = instaData[i].User.fullname;
        let imageUrl = instaData[i].url;
        let profilePicture = instaData[i].User.profilePicture;
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