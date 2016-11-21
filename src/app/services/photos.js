export const PhotosServiceName = 'photos';
import {instaData} from '../default/index';
export const PhotosService = [
  '$http',
  class PhotosService{

    constructor($http,token){
      this.$http = $http;
      // this.token = localStorage.token;
      this.token = location.hash.slice(15,(location.hash.length))
      var newToken = localStorage.token;

      var token =location.hash.slice(15,(location.hash.length));
      localStorage.setItem('token',token);
    }

    getPhotos(id){
      return this.$http.jsonp(`https://api.instagram.com/v1/users/${id}/media/recent/?&callback=JSON_CALLBACK&access_token=${this.token}`);

    }

    getFriends(){
    return this.$http.jsonp(`https://api.instagram.com/v1/users/self/followed-by?count=99&&callback=JSON_CALLBACK&access_token=${this.token}`);
    }

  }
];

