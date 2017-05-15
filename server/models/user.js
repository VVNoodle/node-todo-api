var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: {
    type: String,
    required:true
  },
  age: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  }
});

module.exports = {User};
