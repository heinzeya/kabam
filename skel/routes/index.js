module.exports = exports = function (kabam) {
  kabam.app.get('/', function (request, response) {
    response.render('angularBlank', {title: 'Welcome!'})
  });
};
