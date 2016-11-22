import { MapServiceName } from '../services/map';

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

    var data = [1, 1, 2, 3, 5, 8, 13];

    var width = 960,
        height = 500;

    var outerRadius = height / 2 - 30,
        innerRadius = outerRadius / 3,
        cornerRadius = 10;

    var pie = d3.layout.pie();

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var svg = d3.select('.chart').append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var path = svg.selectAll("path")
        .data(data)
      .enter().append("path");

    var ease = d3.ease("cubic-in-out"),
        duration = 7500;

    d3.timer(function(elapsed) {
      var t = ease(1 - Math.abs((elapsed % duration) / duration - .5) * 2);

      path
          .data(pie.padAngle(t * 2 * Math.PI / data.length)(data))
          .attr("d", arc);
    });
  }
}