var Kernel = require('kabam-kernel');

module.exports = exports = function (config) {
  var kabam = Kernel(config);

//basic frontend
  kabam.usePlugin(require('kabam-plugin-hogan'));
  kabam.extendApp(function (core) {
    //core.app.locals.delimiters = '[[ ]]';
    core.app.locals.javascripts.push({url: '/socket.io/socket.io.js'});
  });
//end of basic frontend

//static html auth/register and edit my profile plugins
  kabam.usePlugin(require('kabam-plugin-welcome'));
  kabam.usePlugin(require('kabam-plugin-my-profile'));

//private messages api
  kabam.usePlugin(require('kabam-plugin-private-message'));

//geoip
  kabam.usePlugin(require('kabam-plugin-geoip'));

//enable plugin to send emails
  if (config.emailConfig) {
    kabam.usePlugin(require('kabam-plugin-notify-email'));
  }

  //rest api for mongoose models
  kabam.usePlugin(require('kabam-plugin-rest'));

  //rest api for mongoose models
  kabam.usePlugin(require('kabam-plugin-users'));

  //task queue
  if (config.spine) {
    //kabam.usePlugin(require('kabam-plugin-spine'));
  }

  return kabam;
};