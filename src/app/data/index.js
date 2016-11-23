import { MapServiceName } from '../services/map';

const template = require ('./data.html');

export const DataCtrlName = 'DataCtrl';

export const DataCtrlState = {
  url: '/data',
  template,
  controller: DataCtrlName,
  controllerAs: 'data'
};

export const DataCtrl = [
  '$scope',
  MapServiceName,
  class DataCtrl {
    constructor($scope, MapService) {
      $scope.locationData = MapService.getLocationData();
      $scope.trendingData = [];
      function count() {
        var sortedArr = [];
        $scope.trendingData.length = 0;
        $scope.locationData.forEach((loc)=> {
          sortedArr.push(loc.name);
        });

        sortedArr.sort();

        var current = null;
        var cnt = 0;
        for (var i = 0; i < sortedArr.length; i++) {
          if (sortedArr[i] != current) {
            if (cnt > 0) {
                var obj = {location: current, count: cnt};
                $scope.trendingData.push(obj);
            }
            current = sortedArr[i];
            cnt = 1;
          } else {
              cnt++;
          }
        }
        $scope.trendingData.sort((a,b) => {
          if(a.count < b.count){
            return 1;
          }
          if(a.count > b.count){
            return -1;
          }
          return 0;
        });

        $scope.trendingData.length = 5;
      }

      count();

      let countArr = [];
      let locArr = [];
      $scope.trendingData.forEach((value) => {

      countArr.push(value.count);
        locArr.push(value.location);

        console.log('countArr',countArr);
      });

      var chart = c3.generate({
        data: {
          x : 'x',
          columns: [
              ['x'].concat(locArr),
              ['trending places'].concat(countArr),
          ],
          groups: [
              ['download', 'loading']
          ],
          type: 'bar'
        },
        axis: {
          x: {
              type: 'categorized' // this is needed to load string x value
          }
        },

      });
    }
  }



  ];