var kabam = require('kabam'),
  fs = require('fs');

var models = fs.readdirSync('./models'),
  routes = fs.readdirSync('./routes'),
  serviceConfig = require('./config/service.json'),
  appConfig = require('./config/app.json');

function config(serviceConfig, appConfig) {
  var config = {};
  for (var prop in serviceConfig) {
    config[prop] = serviceConfig[prop];
  }
  for (prop in appConfig) {
    config[prop] = appConfig[prop];
  }
  return config;
}

var main = kabam(config(serviceConfig, appConfig));

models.map(function(modelName) {
  var modelObj = require('./models/' + modelName);
  main.extendModel(modelObj.name, modelObj.initFunction);
});

routes.map(function(routeName) {
  console.log(routeName);
  main.extendRoutes(require('./routes/'+routeName));
});

// or main.startCluster() to use cluster
main.start();
