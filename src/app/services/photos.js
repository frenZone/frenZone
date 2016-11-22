export const PhotosServiceName = 'photos';
import {instaData} from '../default/index';
export const PhotosService = [
  '$http',
  class PhotosService{


    constructor($http,token){
      this.$http = $http;
      var token = localStorage.getItem("token");
      // if(!token){
      //   token =location.hash.slice(15,(location.hash.length));
      //   console.log("token",token)
      //   localStorage.setItem('token',token);
      // }
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

