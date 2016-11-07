import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
// import MAP_API from './config.js';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'myController',
    controllerAs: 'app'
  };
};

// class AppCtrl {
//   constructor() {
//     this.url = 'https://github.com/preboot/angular-webpack';
//   }
// }

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router'])
  .directive('app', app)
  // .controller('AppCtrl', AppCtrl)
  .constant('MAP_API', "AIzaSyAOXRNnjoPo_6goiZIxCN0-rR7l1be4pYg")
  .controller( 'myController', ['$scope',
      'MAP_API',
    ($scope, MAP_API)=>{

    $scope.mapApi = MAP_API;

  }])
  .controller('myController',['$scope', function($scope){
        $scope.custom = true;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
}]);


export default MODULE_NAME;