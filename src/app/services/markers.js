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

  showAllPhotos (map, oms, instaData){
    console.log('showall');
    deleteMarkers();
     for (var i = 0; i < instaData.length; i++) {
      if(instaData[i].location !== null){
        var coords = instaData[i].location;
        var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        var image = instaData[i].user.profile_picture;
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          title: coords.name,
          id: 'marker',
          icon: {
            url: image,
            scaledSize: new google.maps.Size(40, 40),
            optimized:false
          }
        });
        var infowindow = new google.maps.InfoWindow();
        marker.desc = '<div id="locationPicture">'+
          `<img src="${instaData[i].images.thumbnail.url}"></img>`+
          '</div>';

        oms.addMarker(marker);
      }
      map.setCenter({lat: 21.308743338531, lng: -157.80870209358});
    }
  }

  getUserPhotos (map, oms, data, username){
    this.deleteMarkers(oms);
    var inputTime = document.getElementById('inputTime');
    var inputDisplay = document.getElementById('inputDisplay');
    var displayOutPut = document.getElementById('displayOutPut');
    var numberHours =(Math.round((inputTime.value/3600)) + " hours");

    // if(inputTime.value >= 86400){
    //   numberHours =(Math.round((inputTime.value/86400)) + " days");
    // }
    // inputDisplay.innerHTML = numberHours + " ago";
    for (var i = 0; i < data.length; i++) {
      if(data[i].location !== null && data[i].user.username === username){

        var coords = data[i].location;
        var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
        var image = `https://circle-image-as-a-service-juuyhmkiiy.now.sh/?url=${data[i].user.profile_picture}`;

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
        let username = data[i].user.username;
        let fullName = data[i].user.full_name;
        let imageUrl = data[i].images.low_resolution.url;
        let profilePicture = data[i].user.profile_picture;
        let locationName = data[i].location.name;
        let description = "picture taken at " + locationName;

        if(data[i].caption !== null){
          description = data[i].caption.text;
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
    }
  }
}