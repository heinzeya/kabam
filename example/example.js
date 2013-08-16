var Kabam = require('./../index.js');


var kabam = Kabam({
  'hostUrl':'http://vvv.msk0.ru',
  'mongoUrl':'mongodb://localhost/mwc_dev',
  'secret':'Long_and_hard_secret',
  'redis':'redis://mwcKernel:@localhost:6379',
  'emailConfig':((process.env.emailConfig)?(process.env.emailConfig):'myemail@gmail.com:1234567'),
  "passport":{
    "GITHUB_CLIENT_ID":"--insert-github-client-id-here--",
    "GITHUB_CLIENT_SECRET": "--insert-github-client-secret-here--",
    "TWITTER_CONSUMER_KEY":"--insert-twitter-consumer-key-here--",
    "TWITTER_CONSUMER_SECRET": "--insert-twitter-consumer-secret-here--",
    "FACEBOOK_APP_ID":"--insert-facebook-app-id-here--",
    "FACEBOOK_APP_SECRET":"--insert-facebook-app-secret-here--"
  },
  "spine":{
    'domains':['urgentTasks']
  }
});


kabam.start();