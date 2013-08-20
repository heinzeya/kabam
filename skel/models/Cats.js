exports.name = 'Cats';
exports.initFunction = function (mongoose, config) {
  var CatsSchema = new mongoose.Schema({
    'nickname': String
  });

  CatsSchema.index({
    nickname: 1
  });

  return mongoose.model('cats', CatsSchema);
}