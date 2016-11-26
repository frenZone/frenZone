export const DataServiceName = 'data';

export class DataService {
  count(trendingData, locationData, username) {
    let sortedArr = [];
    trendingData.length = 0;

    locationData.forEach((loc)=> {
      if(loc.username === username){
        sortedArr.push(loc.name);
      } else if (username === undefined || username === 'all'){
        sortedArr.push(loc.name);
      }
    });
    sortedArr.sort();
    let current = null;
    var cnt = 0;
    for (let  i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i] != current) {
        if (cnt > 0) {
            let obj = {location: current, count: cnt};
            trendingData.push(obj);
        }
        current = sortedArr[i];
        cnt = 1;
      } else {
          cnt++;
      }
    }
    trendingData.sort((a,b) => {
      if(a.count < b.count){
        return 1;
      }
      if(a.count > b.count){
        return -1;
      }
      return 0;
    });

    trendingData.length = 5;
    let countArr = [];
    let locArr = [];
    trendingData.forEach((value) => {
      countArr.push(value.count);
      locArr.push(value.location);
    });

    let chart = c3.generate({
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
      legend:{
        show: false
      },
    });

  }

}