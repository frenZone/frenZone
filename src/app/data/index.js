const template = require ('./data.html');

export const DataCtrlName = 'DataCtrl';

export const DataCtrlState = {
  url: '/data',
  template,
  controller: DataCtrlName,
  controllerAs: 'data'
};

export class DataCtrl {
  constructor() {
    var dataset = [
  {
    name: 'Jan P.',
    score: 5
  },
  {
    name: 'Alan',
    score: 3
  },
  {
    name: 'A-Aron',
    score: 3
  },
  {
    name: 'Renee',
    score: 3
  },
  {
    name: 'Casey',
    score: 7
  },
  {
    name: 'Marta',
    score: 3
  },
  {
    name: 'B-Ryan',
    score: 5
  },
  {
    name: 'Gina',
    score: 2
  },
  {
    name: 'Ray',
    score: 4
  },
];

console.log('d3',d3)

var chart = d3.select('.chart');

var bars = chart.selectAll('div')
  .data(dataset)
  .enter().append('div')
  .style('width', (data) => {
  console.log('data',data)
    return `${data.score * 50}px`;
  })
  .text((data) => {
    return `${data.name} ${data.score}`;
  })
  }
}