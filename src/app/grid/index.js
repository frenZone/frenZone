const template = require('./grid.html');

export const GridCtrlName = 'GridCtrl';

export const GridCtrlState = {
  url: '/grid',
  template,
  controller: GridCtrlName,
  controllerAs: 'grid'
};

export class GridCtrl {
  constructor() {
    this.items = [2,4,6,8];
  }
}