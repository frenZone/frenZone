const template = require('./login.html');

export const LoginCtrlName = 'LoginCtrl';

export const LoginCtrlState = {
  url: '/login',
  template,
  controller: LoginCtrlName,
  controllerAs: 'login'
};

export class LoginCtrl {
  constructor() {
    var token = location.hash.slice(15,(location.hash.length))
   // localStorage.setItem('token',JSON.stringify(token))
   localStorage.token =token;
    // console.log(location.hash.slice(15,(location.hash.length)));
    // var token = location.hash.slice(15,(location.hash.length));
    // localStorage.token = token;
  }
}
