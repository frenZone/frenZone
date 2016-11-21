import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { DefaultCtrlState, DefaultCtrl, DefaultCtrlName, instaData } from './default';
import { PhotosServiceName, PhotosService } from './services/photos';
import { MapServiceName, MapService } from './services/map';
import { MarkerServiceName, MarkerService } from './services/markers';
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
      .state('login', LoginCtrlState)


      ;
  })
  .run(($state) => {
    if(localStorage.token === undefined || localStorage.token === ""  ){
      $state.go('login');
    }else{
      $state.go('default');
    }

  })
  .directive('app', app)
  .service(PhotosServiceName, PhotosService)
  .service(MapServiceName, MapService)
  .service(MarkerServiceName, MarkerService)
  .constant('instaData', instaData)
  .controller('AppCtrl', AppCtrl)
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(LoginCtrlName, LoginCtrl);


export default MODULE_NAME;