import angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { DefaultCtrlState, DefaultCtrl, DefaultCtrlName } from './default';
import { FriendsCtrlState, FriendsCtrl, FriendsCtrlName } from './friends';
import { InstagramAPIName, InstagramAPI } from './services/instagramApi.js';

// import MAP_API from './config.js';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  };
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router'])
  .config(($stateProvider) => {
    $stateProvider
      .state('default', DefaultCtrlState)
      .state('friends', FriendsCtrlState)
      ;
  })
  .run(($state) => {
    $state.go('default');
  })
  .directive('app', app)
  .service(InstagramAPIName, InstagramAPI)
  .controller(DefaultCtrlName, DefaultCtrl)
  .controller(FriendsCtrlName, FriendsCtrl)
  .controller('AppCtrl', AppCtrl);


export default MODULE_NAME;