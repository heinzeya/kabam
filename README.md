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

Responsibility guidelines
================

Every Kabam's plugins and package has a maintainer. The maintainers will help to:

1. Maintain the package - fix and find bugs from upgrading modules included or nodejs version change
2. Respond to reported issues or bugs
3. Accept/deny pull request

The `Push` and `npm publish` privilege is the right of the `Responsible developer`. If you are interested to help us make things better here, please fork it and send us a pull request.

Responsible developer for this package is  [Anatolij Ostroumov](https://github.com/vodolaz095).

License
========

Licensed under the MIT License.