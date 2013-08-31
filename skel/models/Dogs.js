exports.name = 'Dogs';
exports.initFunction = function (kabam) {
  var DogsSchema = new kabam.mongoose.Schema({
    'nickname': String
  });

  DogsSchema.index({
    nickname: 1
  });

  return  kabam.mongoConnection.model('dogs', DogsSchema);
}