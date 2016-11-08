export const InstagramAPIName = 'instagramAPI';

export const InstagramAPI = [
  '$http',
  class InstagramAPI {
    constructor($http) {
      this.$http = $http;
    }
    fetchInstagramFeed() {
      return this.$http.jsonp("https://api.instagram.com/v1/users/175690487/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=175690487.5dae370.360702f1fdf248ae87636bb61663f602");
    }

    getFriends() {
      return this.$http.jsonp("https://api.instagram.com/v1/users/self/followed-by?count=99&&callback=JSON_CALLBACK&access_token=175690487.5dae370.360702f1fdf248ae87636bb61663f602");
    }

    getLocation(){
      return this.$http.jsonp("https://api.instagram.com/v1/media/search?lat=21.2922381&lng=-157.8237538&distance=5000&callback=JSON_CALLBACK&access_token=175690487.5dae370.360702f1fdf248ae87636bb61663f602");
    }
  }
];
