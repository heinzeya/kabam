Kabam
========

Higher level framework build on top of - [mwc_kernel](https://github.com/mywebclass/mwc_kernel)

[![Build Status](https://travis-ci.org/mykabam/kabam.png)](https://travis-ci.org/mykabam/kabam)

Plugins included:

- [kabam-kernel](https://github.com/mykabam/kabam-kernel) - Kernel [![Build Status](https://travis-ci.org/mykabam/kabam.png)](https://travis-ci.org/mykabam/kabam)
- [kabam-plugin-hogan](https://github.com/mykabam/kabam-plugin-hogan) - hoganJS template engine - [![Build Status](https://travis-ci.org/mykabam/kabam-plugin-hogan.png)](https://travis-ci.org/mykabam/kabam-plugin-hogan)
- [kabam-plugin-welcome](https://github.com/mykabam/kabam-plugin-welcome) - static html authorization plugin
- [kabam-plugin-my-profile](https://github.com/mykabam/kabam-plugin-my-profile) - plugin to edit my profile
- [kabam-plugin-private-message](https://raw.github.com/mykabam/kabam-plugin-private-message) [![Build Status](https://travis-ci.org/mykabam/kabam-plugin-private-message.png)](https://travis-ci.org/mykabam/kabam-plugin-private-message)
- [kabam-plugin-notify-email](https://github.com/mykabam/kabam-plugin-notify-email) - notify users by email
- [kabam-plugin-rest](https://github.com/mykabam/kabam-plugin-rest) - REST interface for mongoose collections
- [kabam-plugin-spine](https://github.com/mykabam/kabam-plugin-spine) - Redis backended task queue [![Build Status](https://travis-ci.org/mykabam/kabam-plugin-spine.png?branch=master)](https://travis-ci.org/mykabam/kabam-plugin-spine)

Example
=========

We have an examples too, [check it out here](https://github.com/mykabam/kabam/blob/master/example/example.js).

Documentation
=========

For now Kabam object is mwcKernel object with preinstalled plugins.
All mwcKernel api is exposed on it.
[Please, have a good time to read more complete documentations](http://ci.monimus.com/docs/#/api).

Plugins are activated if they find proper field in config object:

```javascript

    var kabam = Kabam({
      //vvv mandatory fields vvv
      'hostUrl':'http://vvv.msk0.ru/',
      'mongoUrl':'mongodb://localhost/mwc_dev',
      'secret':'Long_and_hard_secret',
      //^^^ mandatory fields ^^^

      'redis':'redis://mwcKernel:@localhost:6379',


      "passport":{
        "FACEBOOK_APP_ID":"--insert-facebook-app-id-here--", //activate autorization for facebook by /auth/facebook
        "FACEBOOK_APP_SECRET":"--insert-facebook-app-secret-here--"
      },
      'emailConfig':'myemail@gmail.com:1234567', // activate  mwc_plugin_notify_by_email
      'spine':{ //activate mwc_plugin_spine
        'domains':['urgentTasks']
      }
    });

```

Exposed API
================

 `Model`. Kabam fully exposes model object of kernel application, that includes all mongoose models,
 being used by this application

 `User model`. Kabam fully exposes kernel user model, so we can create, edit and do other user related tasks programmaticly.
 Actual documentation on User's model is published here [http://ci.monimus.com/docs/#/api/kabamKernel.model.User](http://ci.monimus.com/docs/#/api/kabamKernel.model.User)
 The user model itself is a Active Record class, build on top of [mongooseJS](http://mongoosejs.com/) schema
 The user model instance - User, is described here - [http://ci.monimus.com/docs/#/api/User](http://ci.monimus.com/docs/#/api/User)

  Example:

```javascript

  kabam.model.User.findOne({'username':'vodolaz095'}, function(err,userFound){
    userFound.notify('email','Hello!');
    usesFound.setPassword('someNewPassword',function(err){
      userFound.notify('email','Your new password is "someNewPassword"');
    });
  });

  kabam.model.User.signUp('vodolaz095','vodolaz096@example.org', 'SomeLooongAndHardPassw0rd', function(err,userCreated){
    userFound.notify('email','Hello! Verify your email please, see our previous message!');
  });

```

  `redis`. Kabam can spawn ready to work redis clients by command [kabam.createRedisClient](http://ci.monimus.com/docs/#/api/kabamKernel.createRedisClient)

```javascript

  var client = kabam.createRedisClient();
  client.set('someValue','1',function(err){
    if(err) throw err;
    console.log('value is set!');
  });

```

  `Event emmiter` - kabam inherites the event emmiting capabilities from kernel, and kernel inherits it from [nodejs event emmiter](http://nodejs.org/api/events.html)
  For now kabam emits events on various of situation. They are mainly documented here [http://ci.monimus.com/docs/#/api/kabamKernel.on](http://ci.monimus.com/docs/#/api/kabamKernel.on)
  For example,

```javascript

    kabam.on('http',function(log){ //basic http logger
      if(log.username){
        console.log('User "'+log.username+'" made '+log.method+' request to page '+log.uri + ' from IP of '.log.ip);
      } else {
        console.log('User "Anonimus" made '+log.method+' request to page '+log.uri + ' from IP of '.log.ip);
      }
    });

    //event handler for user being registered
    kabamKernel.on('users:signUp', function(user){
       if(user.email === 'freddyKrugger@example.org'){
          user.ban(function(err){
            if(err) throw err;
          })
       } else {
         console.log('Welcome, '+user.username + '!');
       }
    });


```

Responsibility guidelines
================

Every Kabam's plugins and package has a maintainer. The maintainers will help to:

1. Maintain the package - fix and find bugs from upgrading modules included or nodejs version change
2. Respond to reported issues or bugs
3. Accept/deny pull request

The `Push` and `npm publish` privilege is the right of the `Responsible developer`. If you are interested to help us make things better here, please fork it and send us a pull request.

Responsible developer for this package is  [Anatolij Ostroumov](https://github.com/vodolaz095).

Deployment on heroku
================

We need to add custom buildpack for cairo lib - used in captcha

```shell
  $ heroku config:set BUILDPACK_URL='git://github.com/mojodna/heroku-buildpack-nodejs.git#cairo'
```

We need to install one of Redis and one MongoDB providers available at [https://addons.heroku.com](https://addons.heroku.com)

We need to manually set the hostUrl
```shell
  $ heroku config:set hostUrl='http://mykabam.herokuapp.com/'
```

We need to set the email credentials for application

```shell
  $ heroku config:set emailConfig='mywebclass@webizly.com:someVeryLongAndHardPasswordToIrritateSpammersALittleMore111111'
```

You can try this application in action - [http://mykabam.herokuapp.com/](http://mykabam.herokuapp.com/).
For now

 - You can sign up by username, email and password
 - Sign in by username and login
 - Edit profile [http://mykabam.herokuapp.com/auth/myProfile](http://mykabam.herokuapp.com/auth/myProfile)
 - See how geotagging works here [http://mykabam.herokuapp.com/](http://mykabam.herokuapp.com/). For me it shows that i  am in town of Moscow, but i am in city of Klin now... 50km from Moscow
 - Set first name, last name, skype and attach github/twitter accounts (facebook do not works for now)



License
========

Licensed under the MIT License.