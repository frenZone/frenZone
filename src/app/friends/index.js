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

    }

  }
];