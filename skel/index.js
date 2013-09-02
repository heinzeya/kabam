var whoAmI = require(process.cwd()+'/package.json');
if(whoAmI.name === 'kabam'){
  //this is demo application
  var kabam = require('./../index.js');
} else {
  //this is applicationm created by kabamCli
  var kabam = require('kabam');
}

var fs = require('fs');

var models = fs.readdirSync(__dirname+'/models'),
  routes = fs.readdirSync(__dirname+'/routes'),
  serviceConfig = require(__dirname+'/config/service.json'),
  appConfig = require(__dirname+'/config/app.json');

function createConfig(serviceConfig, appConfig) {
  var config = {};
  for (var prop in serviceConfig) {
    config[prop] = serviceConfig[prop];
  }
  for (prop in appConfig) {
    config[prop] = appConfig[prop];
  }
  return config;
}

var main = kabam(createConfig(serviceConfig, appConfig));

models.map(function(modelName) {
  var modelObj = require(__dirname+'/models/' + modelName);
  main.extendModel(modelObj.name, modelObj.initFunction);
});

routes.map(function(routeName) {
  //console.log(routeName);
  main.extendRoutes(require(__dirname+'/routes/'+routeName));
});

if(main.config.startCluster){
  main.startCluster();//to start application as cluster
} else {
  main.start();//to start single process
}

//realtime socket.io powered clock
if(main.config.io.enabled){
  setInterval(function() {
    main.emit('broadcast', {
      'time': new Date().toLocaleTimeString()
    });
  }, 500);
}
