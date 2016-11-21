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
      $scope.oms = MapService.getOms();

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
      $scope.setMapOnAll = MarkerService.setMapOnAll.bind(MarkerService, $scope.map);
      $scope.showMarkers = MarkerService.showMarkers.bind(MarkerService, $scope.map);
      $scope.clearMarkers = MarkerService.clearMarkers.bind(MarkerService);
      $scope.deleteMarkers = MarkerService.deleteMarkers.bind(MarkerService);
      $scope.centerMap = MarkerService.centerMap.bind(this, $scope.map, $scope.locationData);
      $scope.getUserPhotos = MarkerService.getUserPhotos.bind(MarkerService, $scope.map, MapService.oms, $scope.instaData);
      $scope.showAllPhotos = MarkerService.showAllPhotos.bind(MarkerService, $scope.map, MapService.oms, $scope.instaData);

      MapService.update = function () {
        $scope.instaData = this.instaData;
        $scope.locationData = this.locationData;
        $scope.locations = this.locations;
        $scope.oms = this.oms;
        //console.log($scope.oms);
      };
      $scope.onChange = function (){
        var numberHours =(Math.round(($scope.inputTime/3600)) + " hours");
        if($scope.inputTime >= 86400){
          numberHours =(Math.round(($scope.inputTime/86400)) + " days");
        }
        $scope.inputTimeDisplay = numberHours + " ago";
      };


      $scope.logout = function (){
      };


      PhotosService.getFriends()
      .success((friends) => {
        $scope.friends = friends.data;
      });

    }
  }

];