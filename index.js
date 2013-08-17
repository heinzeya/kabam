var mwcKernel = require('mwc_kernel');

module.exports = exports = function (config) {
  var MWC = mwcKernel(config);

//basic frontend
  MWC.extendApp(function (core) {
    core.app.locals.delimiters = '[[ ]]';
  });
  MWC.usePlugin(require('mwc_plugin_hogan_express'));
//end of basic frontend

//static html auth/register and edit my profile plugins
  MWC.usePlugin(require('mwc_plugin_welcome'));
  MWC.usePlugin(require('mwc_plugin_my_profile'));

  //enable plugin to send emails
  if (config.emailConfig) {
    MWC.usePlugin(require('mwc_plugin_notify_by_email'));
  }

  //rest api for mongoose models
  MWC.usePlugin(require('mwc_plugin_rest'));


  //task queue
  if (config.spine) {
    MWC.usePlugin(require('mwc_plugin_spine'));
  }

  return MWC;
};