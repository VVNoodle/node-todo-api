const validator = require('validator');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    minlength: 1,
    required: true,
    unique: true,
    validate: {
      isAsync: false,
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

userSchema.statics.findByCredentials = function(email, password){
  var User = this;
  return User.findOne({email}).then((data)=>{
    if(!data){
      return Promise.reject();
    }
    return new Promise((resolve, reject)=>{
      bcrypt.compare(password, data.password, (err, res)=>{
        if(res) resolve(data);
        else reject();
      });
    });
  });
};

userSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt, (err, hash)=>{
          user.password = hash;
          next();
      });
    });
  }else{
    next();
  }
})

var User = mongoose.model('User', userSchema);
module.exports = {User};
// module.exports.User = User;
