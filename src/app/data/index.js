import { MapServiceName } from '../services/map';
import { DataServiceName } from '../services/data';
import { PhotosServiceName } from '../services/photos';

const template = require ('./data.html');

export const DataCtrlName = 'DataCtrl';

export const DataCtrlState = {
  url: '/data',
  template,
  controller: DataCtrlName,
  controllerAs: 'data'
};

export const DataCtrl = [
  '$scope',
  MapServiceName,
  DataServiceName,
  PhotosServiceName,
  '$sce',
  class DataCtrl {
    constructor($scope, MapService, DataService, PhotosService) {
      $scope.friends = [];
      $scope.locationData = MapService.getLocationData();
      $scope.trendingData = [];
      $scope.count = DataService.count.bind(this, $scope.trendingData, $scope.locationData);
      $scope.count();

      PhotosService.getFriends()
      .success((friends) => {
        $scope.friends = friends.data;
      });

      $scope.selectedFriends = 'all';

    }
  }

];