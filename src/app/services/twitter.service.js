export class TwitterService {

  constructor($http){
    "ngInject";

    this.$http = $http;
    this.url = 'http://10.0.1.137:8080/api'
  }

  getTweets(page) {
    return this.$http.get(`${ this.url }/tweets?page=${ page }&size=10&sort=createdDate,desc`)
      .then(
      (response) => {
        let tweets =[];
        response.data._embedded.tweet.forEach((elements) => {
          tweets.push(this.createBasicTweet(elements));
        })

        return tweets;
    })
  }

  createBasicTweet(data) {
    return {
      name      : data.name,
      message   : data.message,
      date      : new Date(data.createdDate.year,
                           data.createdDate.monthValue - 1,
                           data.createdDate.dayOfMonth,
                           data.createdDate.hour,
                           data.createdDate.minute,
                           data.createdDate.second),
      selfLinks : data._links.self
    }
  }

  deleteTweet(tweet) {
    return this.$http.delete(tweet.selfLinks.href)
  }

  sendTweet(name, message){
    return this.$http.post(`${ this.url }/tweets`, {
      name    : name,
      message : message
    })
  }

}
