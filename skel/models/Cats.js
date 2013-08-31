exports.name = 'Cats';
exports.initFunction = function (kabam) {
  var CatsSchema = new kabam.mongoose.Schema({
    'nickname': String
  });

  CatsSchema.index({
    nickname: 1
  });

  return kabam.mongoConnection.model('cats', CatsSchema);
}