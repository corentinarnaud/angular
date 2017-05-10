export class NewTweetController{
  constructor(TwitterService, $state){
    "ngInject";

    this.$state = $state;
    this.twitterService = TwitterService;
    this.name="";
    this.message="";
  }


  sendTweet(){
    if (this.name != "") {
      this.twitterService.sendTweet(this.name, this.message).then(() => {
        this.goHome();
      });
    }
  }

  sendSpam(){
    if (this.name != "") {
      for(let i = 0 ; i < 99 ; i++){
        this.twitterService.sendTweet(this.name, this.message + " " +i)
      }
      this.twitterService.sendTweet(this.name, this.message).then(() => {
        this.goHome();
      });
    }
  }

  goHome(){
    this.$state.go('home');
  }
}

