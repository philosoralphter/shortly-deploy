var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

userSchema.pre('save', function(next){
 bcrypt.hash(this.password, null, null, function(err, hash) {
    this.password = hash;
    next();
  }.bind(this));
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {console.log(err);}
    callback(isMatch);
  });
};

// User.prototype.hashPassword = function() {
//   console.log('this outside', this)
// }


module.exports = User;
