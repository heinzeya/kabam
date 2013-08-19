var Kabam = require('kabam'),
  fs = require('fs');

var models = fs.readdirSync('./models'),
  routes = fs.readdirSync('./routes');

var kabam = Kabam(require('./config.json'));

models.map(function(modelName){
  var modelObj = require('./models/'+modelName);
  kabam.extendModel(modelObj.name, modelName.function);
});

routes.map(function(routeName){
  console.log(routeName);
  kabam.extendRoutes(require('./routes/'+routeName));
});


kabam.startCluster();