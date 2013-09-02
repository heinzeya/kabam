module.exports = exports = function (kabam) {
  kabam.app.get('/hello', function (request, response) {
    if (request.user) {
      setTimeout(function () {
        request.user.notify('sio', 'Hello! ' + request.user.username);
      }, 1000);
    }
    response.redirect('back');
  });
}

