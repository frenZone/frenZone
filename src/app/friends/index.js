const template = require('./friends.html');

export const FriendsCtrlName = 'FriendsCtrl';

export const FriendsCtrlState = {
  url: '/friends',
  template,
  controller: FriendsCtrlName,
  controllerAs: 'friends'
};

export class FriendsCtrl {
  constructor() {
    this.items = [2,4,6,8];
  }
}