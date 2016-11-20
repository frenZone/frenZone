
const template = require('./login.html');

export const LoginCtrlName = 'LoginCtrl';

export const LoginCtrlState = {
  url: '/login',
  template,
  controller: LoginCtrlName,
  controllerAs: 'login'
};

 var token =location.hash.slice(15,(location.hash.length));
      localStorage.setItem('token',token);

export class LoginCtrl {
  constructor() {
    var token = location.hash.slice(15,(location.hash.length))
    localStorage.token =token;
  }
}
