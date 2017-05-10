export class MainController {
  constructor(TwitterService, $interval, $state) {
    "ngInject";

    const intervalValue = 3000;

    this.currentPage = 0;
    this.newPage = 1;

    this.$state = $state;
    this.twitterService = TwitterService;

    this.$interval = $interval;
    this.intervalId = this.$interval(() => {
      this.getTweets()
    }, intervalValue);

    this.getTweets();
  }

  clearInput() {
    this.name = "";
  }

  getTweets() {
    this.twitterService.getTweets(this.currentPage)
      .then((response) => {
        console.log(response);
        this.tweets = response;
      })
  }

  deleteTweet(tweet) {
    this.twitterService.deleteTweet(tweet).then(() => {
      this.getTweets();
    });
  }

  goNewTweet() {
    this.$interval.cancel(this.intervalId);
    this.$state.go('newTweet');
  }

  getPage(){
    this.currentPage = this.newPage-1;
    this.getTweets();
  }
}


