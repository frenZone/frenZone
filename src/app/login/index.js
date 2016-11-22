const template = require('./login.html');

export const LoginCtrlName = 'LoginCtrl';

export const LoginCtrlState = {
  url: '/login',
  template,
  controller: LoginCtrlName,
  controllerAs: 'login'
};

export const LoginCtrl = [
  class LoginCtrl{
    constructor() {
      var token = localStorage.getItem("token");
      if(!token){
        token =location.hash.slice(15,(location.hash.length));
        console.log("token",token)
        localStorage.setItem('token',token);
      }
    }
  }
];
