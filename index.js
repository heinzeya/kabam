var Kernel = require('kabam-kernel');

module.exports = exports = function (config) {
  var kabam = Kernel(config);

//basic frontend
  kabam.usePlugin(require('kabam-plugin-hogan'));
  kabam.extendApp(function (core) {
    //core.app.locals.delimiters = '[[ ]]';
    core.app.locals.javascripts.push({url: '/socket.io/socket.io.js'});
  });
//  kabam.extendMiddleware(function(kernel){
//    return express.static(path.join(__dirname, 'public'));
//  });
//end of basic frontend

//static html auth/register and edit my profile plugins
// NOTE(chopachom): disabling welcome plugin because it messes up with all other routes (requires auth)
//  kabam.usePlugin(require('kabam-plugin-welcome'));
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

  kabam.usePlugin(require('kabam-core-web-frontend'));

  kabam.extendApp(function(core){
    // all bower's`kabam-core-web-frontend` components will be served as `/assets/<component-name>`
    // `public/bower_components` folder is itself added to mincer by npm's `kabam-core-web-frontend` so
    // all bower components will be served as `/assets/<component-name>` too
    // we need to use `prependPath` because we need higher priority for /kabam-core-web-frontend/public/components
    core.app.locals.mincerENV.prependPath('public/bower_components/kabam-core-web-frontend/public/components');
    // this is needed for styles only, since they are lying in `/public/styles`, so we append public to the end
    // just to use `/assets/styles/<style-name>`
    core.app.locals.mincerENV.appendPath('public/bower_components/kabam-core-web-frontend/public');
  });

  //task queue
  if (config.spine) {
    //kabam.usePlugin(require('kabam-plugin-spine'));
  }

  kabam.usePlugin(require('kabam-plugin-logger-file'));

  kabam.usePlugin(require('kabam-plugin-logger-http-mongo'));
  kabam.usePlugin(require('kabam-plugin-logger-error-mongo'));
  return kabam;
};
