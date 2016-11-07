angular.module('myApp') // attach a controller to the module

.controller( 'myController', ['$scope', 'instagramAPI', ($scope, instagramAPI) => {

  instagramAPI.fetchInstagramFeed()
    .success((pictures) => {
      $scope.pictures = pictures;

      $scope.layout = "list";
      $scope.setLayout = (layout)=>{
        $scope.layout= layout;
    }
    // console.log(pictures);
  })

  instagramAPI.fetchFriendsInstagramFeed()
    .success((friends) => {
      console.log("friends",friends)
     $scope.friends = friends.data;
    });

    instagramAPI.fetchLocation()
    .success((locations) => {
      console.log("location",locations.data)
     $scope.locations = locations.data;
    });

}]);