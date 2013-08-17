var mwcKernel = require('mwc_kernel');

module.exports = exports = function (config) {
  var MWC = mwcKernel(config);
  MWC.extendApp(function(core){
    core.app.locals.delimiters = '[[ ]]';
  });
  MWC.usePlugin(require('mwc_plugin_hogan_express'));

  MWC.usePlugin(require('mwc_plugin_welcome'));
  MWC.usePlugin(require('mwc_plugin_my_profile'));
  MWC.usePlugin(require('mwc_plugin_notify_by_email'));

  MWC.usePlugin(require('mwc_plugin_rest'));
  MWC.usePlugin(require('mwc_plugin_spine'));

  return MWC;
};