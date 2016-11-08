// const template = require('./friends.html');

// export const FriendsCtrlName = 'FriendsCtrl';

// import { InstagramAPIName } from '../services/instagramApi.js';

// export const FriendsCtrlState = {
//   url: '/friends',
//   template,
//   controller: FriendsCtrlName,
//   controllerAs: 'friends'
// };
// export const FriendsCtrl = [
//   '$scope',
//   InstagramAPIName,
//   class FriendsCtrl {
//     constructor($scope, instagramAPI) {
//       instagramAPI.fetchInstagramFeed()
//       .success((pictures) => {
//         $scope.pictures = pictures;
//           console.log('pictures', pictures);
//         $scope.layout = "list";
//         $scope.setLayout = (layout) => {
//           $scope.layout= layout;
//         };
//       });

//       instagramAPI.getFriends()
//       .success((friends) => {
//         console.log("friends",friends);
//        $scope.friends = friends.data;
//       });

//       instagramAPI.getLocation()
//       .success((locations) => {
//         console.log("location",locations);
//        $scope.locations = locations.data;
//       });

//     }
//   }

// ];