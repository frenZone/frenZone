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
      $scope.locationData = MapService.getLocationData();
      $scope.locations = MapService.getLocations();
      $scope.locationSet = MapService.getLocationSet();
      $scope.oms = MapService.getOms();

      MapService.initMap();
      $scope.instaData.length = 0;
      $scope.locationData.length = 0;

      MapService.getData();

      $scope.map = MapService.getMap();
      $scope.setMapOnAll = MarkerService.setMapOnAll.bind(MarkerService, $scope.map);
      $scope.showMarkers = MarkerService.showMarkers.bind(MarkerService, $scope.map);
      $scope.clearMarkers = MarkerService.clearMarkers.bind(MarkerService);
      $scope.deleteMarkers = MarkerService.deleteMarkers.bind(MarkerService);

      $scope.centerMap = MarkerService.centerMap.bind(this, $scope.map, $scope.locationData);

      $scope.getUserPhotos = MarkerService.getUserPhotos.bind(MarkerService, $scope.map, MapService.oms, $scope.locationData, MapService.locations, MapService.locationSet, $scope.instaData);
      $scope.showAllPhotos = MarkerService.showAllPhotos.bind(MarkerService, $scope.map, MapService.oms, $scope.locationData, MapService.locations, MapService.locationSet, $scope.instaData);

      MapService.update = function () {
        $scope.instaData = this.instaData;
        $scope.locationData = this.locationData;
        $scope.locations = this.locations;
        $scope.locationSet = this.locationSet;
        $scope.oms = this.oms;
      };
      $scope.onChange = function (){
        var numberHours =(Math.round(($scope.inputTime/3600)) + " hours");
        if($scope.inputTime >= 86400){
          numberHours =(Math.round(($scope.inputTime/86400)) + " days");
        }
        $scope.inputTimeDisplay = numberHours + " ago";
      };

      $scope.logout = function (){
        localStorage.clear();
      };

      PhotosService.getFriends()
      .success((friends) => {
        $scope.friends = friends.data;
      });

      $scope.openNav = function(){
        let sideNav = document.getElementById("mySidenav");
        if(sideNav.style.width === "0px"){
          sideNav.style.width = "250px";
        }else{
          sideNav.style.width = "0px";
        }
      };

    }
  }

];