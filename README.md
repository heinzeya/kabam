Kabam
========

Higher level framework build on top of - [mwc_kernel](https://github.com/mywebclass/mwc_kernel)

[![Build Status](https://travis-ci.org/mykabam/kabam.png)](https://travis-ci.org/mykabam/kabam)

Plugins included:

- [mwc_kernel](https://github.com/mywebclass/mwc_kernel) - Kernel
- [mwc_plugin_hogan_express](https://github.com/mywebclass/mwc_plugin_hogan_express) - hoganJS template engine
- [mwc_plugin_welcome](https://github.com/mywebclass/mwc_plugin_welcome) - static html authorization plugin
- [mwc_plugin_my_profile](https://github.com/mywebclass/mwc_plugin_my_profile) - plugin to edit my profile
- [mwc_plugin_notify_by_email](https://github.com/mywebclass/mwc_plugin_notify_by_email) - notify users by email
- [mwc_plugin_rest](https://github.com/mywebclass/mwc_plugin_rest) - REST interface for mongoose collections
- [mwc_plugin_spine](https://github.com/mywebclass/mwc_plugin_spine) - Redis backended task queue

Example
=========
[See here](https://github.com/mykabam/kabam/blob/master/example/example.js)

Documentation
=========

For now kabam object is mwcKernel object with plugins preinstalled.
All mwcKernel api is exposed on him - [see documentation](http://ci.monimus.com/docs/#/api)

Plugins are activated if they find proper field in config object.

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
What do "Kabam" means?
================

It is abbrebation of names:

 - [Keith Williams](https://github.com/kaw393939) - copyright owner
 - [Anatolij Ostroumov](https://github.com/vodolaz095) - responsible developer for this package
 - [Budiman T.](https://github.com/valmy) - developer
 - [Alexander Petrovich](https://github.com/chopachom) - developer
 - [Muhammad Ghazali](https://github.com/muhammadghazali) - developer

Responsibility guidelines
================
Every kabam plugin and package has the responsible developer. His duties are

1) Maintain the package - fix and found bugs from upgrading modules included or nodejs version change
2) React on bug reports
3) Accept/deny pull request.

The `Push` and `npm publish` privilege is the right of the `Responsible developer`, but the `fork` - is for everybody.

Responsible developer for this package is  [Anatolij Ostroumov](https://github.com/vodolaz095)


