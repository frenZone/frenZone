angular.module('myApp') // attach a controller to the module

.controller( 'myController', ['$scope', 'instagramAPI', ($scope, instagramAPI) => {

 $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    };

  instagramAPI.fetchInstagramFeed()
    .success((pictures) => {
      $scope.pictures = pictures;

      $scope.layout = "list";
      $scope.setLayout = (layout)=>{
        $scope.layout= layout;
    };
  });

  instagramAPI.fetchFriendsInstagramFeed()
    .success((friends) => {
      console.log("friends",friends);
     $scope.friends = friends.data;
    });

  instagramAPI.fetchLocation()
  .success((locations) => {
    console.log("location",locations.data);
   $scope.locations = locations.data;
  });

}]);