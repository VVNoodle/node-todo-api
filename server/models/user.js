const validator = require('validator');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:false,
  },
  age: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    trim: true,
    minlength: 1,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();
  user.tokens.push({access, token});
  return user.save().then(()=>{
    return token;
  });
};

//statics is object like method but instead of returning instance method, it returns a model method
userSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;//store decoded jwt values

  try{
    decoded = jwt.verify(token, 'secret');
  } catch(e){
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', userSchema);
module.exports = {User};
// module.exports.User = User;
