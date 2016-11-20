export const PhotosServiceName = 'photos';
import {instaData} from '../default/index';
export const PhotosService = [
  '$http',
  class PhotosService{

    constructor($http, token){
      this.$http = $http;
      this.token = location.hash.slice(15,(location.hash.length))

      var newToken = localStorage.token;
      var token =location.hash.slice(15,(location.hash.length));
      localStorage.setItem('token',token);
       // localStorage.token = token;
      console.log("location.hash2 ",location.hash.slice(15,(location.hash.length)));
      // console.log("WWW",JSON.parse(localStorage.getItem(token)))
      // console.log("this.token",this.token)
      console.log("localStorage.token",localStorage.token)
      console.log("token",token)
    }

    getPhotos(id){
      // return this.$http.jsonp(`https://api.instagram.com/v1/users/${id}/media/recent/?&callback=JSON_CALLBACK&access_token=175690487.02eff85.fd0b74d4431044a9b82fc9a925d036ad`);
            return this.$http.jsonp(`https://api.instagram.com/v1/users/${id}/media/recent/?&callback=JSON_CALLBACK&access_token=${this.token}`);

    }

    getFriends(){
    return this.$http.jsonp(`https://api.instagram.com/v1/users/self/followed-by?count=99&&callback=JSON_CALLBACK&access_token=${this.token}`);
    }

  }
];

