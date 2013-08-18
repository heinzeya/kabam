var Kernel = require('kabam-kernel');

module.exports = exports = function (config) {
  var kabam = Kernel(config);

//basic frontend
  kabam.extendApp(function (core) {
    core.app.locals.delimiters = '[[ ]]';
  });
  kabam.usePlugin(require('kabam-plugin-hogan'));
//end of basic frontend

//static html auth/register and edit my profile plugins
  kabam.usePlugin(require('kabam-plugin-welcome'));
  kabam.usePlugin(require('kabam-plugin-my-profile'));

  //enable plugin to send emails
  if (config.emailConfig) {
    kabam.usePlugin(require('kabam-plugin-notify-email'));
  }

  //rest api for mongoose models
  kabam.usePlugin(require('mwc_plugin_rest'));


  //task queue
  if (config.spine) {
    kabam.usePlugin(require('mwc_plugin_spine'));
  }

  return kabam;
};