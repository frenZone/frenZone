import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { DefaultCtrlState, DefaultCtrl, DefaultCtrlName, instaData } from './default';
import { GridCtrlState, GridCtrl, GridCtrlName } from './grid';
import { LocationCtrlState, LocationCtrl, LocationCtrlName } from './location';
import { PhotosServiceName, PhotosService } from './services/photos';
import { FriendsCtrlState, FriendsCtrl, FriendsCtrlName } from './friends';
import { LoginCtrlState, LoginCtrl, LoginCtrlName} from './login';

import '../style/app.css';



let app = () => {
  return {
    template: require('./app.html'),

  }
};


class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router'])
  .config(($urlRouterProvider,$stateProvider) => {
    $urlRouterProvider.otherwise('default');
    $stateProvider
      .state('default', DefaultCtrlState)
      .state('grid', GridCtrlState)
      .state('location', LocationCtrlState)
      .state('friends', FriendsCtrlState)
      .state('login', LoginCtrlState)


      ;
  })
  .run(($state) => {
    if(localStorage.token === undefined || localStorage.token === null ){
      $state.go('login');
    }else{
      $state.go('default');
    }


  })
  .directive('app', app)
  .service(PhotosServiceName, PhotosService)
  .constant('instaData', instaData)
  .controller('AppCtrl', AppCtrl)
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(GridCtrlName, GridCtrl)
  .controller(FriendsCtrlName, FriendsCtrl)
  .controller(LoginCtrlName, LoginCtrl)
  .controller(LocationCtrlName, LocationCtrl);


export default MODULE_NAME;