exports.name = 'Dogs';
exports.initFunction = function (mongoose, config) {
  var DogsSchema = new mongoose.Schema({
    'nickname': String
  });

  DogsSchema.index({
    nickname: 1
  });

  return mongoose.model('dogs', DogsSchema);
}