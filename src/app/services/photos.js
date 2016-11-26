export const PhotosServiceName = 'photos';
export const PhotosService = [
  '$http',
  class PhotosService{

    constructor($http,token){
      this.$http = $http;
      var token = localStorage.getItem("token");
      this.token = token;
    }

    getPhotos(id){
      return this.$http.jsonp(`https://api.instagram.com/v1/users/${id}/media/recent/?&callback=JSON_CALLBACK&access_token=${this.token}`);

    }

    getFriends(){
    return this.$http.jsonp(`https://api.instagram.com/v1/users/self/followed-by?count=99&&callback=JSON_CALLBACK&access_token=${this.token}`);
    }

  }
];

