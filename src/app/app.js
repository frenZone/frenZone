import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { DefaultCtrlState, DefaultCtrl, DefaultCtrlName, instaData } from './default';
// import { GridCtrlState, GridCtrl, GridCtrlName } from './grid';
// import { LocationCtrlState, LocationCtrl, LocationCtrlName } from './location';
import { PhotosServiceName, PhotosService } from './services/photos';
import { MapServiceName, MapService } from './services/map';
import { MarkerServiceName, MarkerService } from './services/markers';
import { DataCtrlState, DataCtrl, DataCtrlName } from './data';
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
      // .state('grid', GridCtrlState)
      // .state('location', LocationCtrlState)
      .state('data', DataCtrlState)
      .state('login', LoginCtrlState)


      ;
  })
  .run(($state) => {
    if(localStorage.token === undefined || localStorage.token === ""  ){
      $state.go('login');
      console.log('hit login page')
    }else{
      $state.go('default');
      console.log('hit default page')
    }


  })
  .directive('app', app)
  .service(PhotosServiceName, PhotosService)
  .service(MapServiceName, MapService)
  .service(MarkerServiceName, MarkerService)
  .constant('instaData', instaData)
  .controller('AppCtrl', AppCtrl)
  .controller(DefaultCtrlName, DefaultCtrl)
  // .controller(GridCtrlName, GridCtrl)
  .controller(DataCtrlName, DataCtrl)
  .controller(LoginCtrlName, LoginCtrl)
  // .controller(LocationCtrlName, LocationCtrl);


export default MODULE_NAME;