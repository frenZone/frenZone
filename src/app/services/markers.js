export const MarkerServiceName = 'marker';

export class MarkerService {
  centerMap (center){
    console.log(locationData);
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
}