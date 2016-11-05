const template = require('./list.html');

export const ListCtrlName = 'ListCtrl';

export const ListCtrlState = {
  url: '/list',
  template,
  controller: ListCtrlName,
  controllerAs: 'list'
};

export class ListCtrl {
  constructor() {
    this.items = [1,3,5,7];
  }
}
