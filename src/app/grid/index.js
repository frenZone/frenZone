import { PhotosServiceName } from '../services/photos';

const template = require('./grid.html');

export const GridCtrlName = 'GridCtrl';

export const GridCtrlState = {

  url: '/grid',
  template,
  controller: GridCtrlName,
  controllerAs: 'grid'
};

export const GridCtrl = [
  '$scope',
  PhotosServiceName,
  '$sce',
  class GridCtrl {
    constructor($scope, PhotosService,$sce) {
      $scope.photos = [];
      $scope.friends =[];
      $scope.locations=[];
      $scope.getUserPhotos = this.getUserPhotos.bind(this);
      this.PhotosService = PhotosService;

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
      this.getUserPhotos();

    }
      getUserPhotos(id){
        this.PhotosService.getPhotos(id)
        .success((photos)=>{
          for (var i = 0; i < photos.data.length; i++){
            if(photos.data[i].type === 'video'){
              photos.data[i].videos.standard_resolution.url = $sce.trustAsResourceUrl(photos.data[i].videos.standard_resolution.url);
            }
          }
          $scope.photos = photos;
        });
      }
  }
];