export const PhotosServiceName = 'photos';
import {instaData} from '../default/index';
export const PhotosService = [
  '$http',
  class PhotosService{

    constructor($http){
      this.$http = $http;
      this.token = localStorage.token;
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

