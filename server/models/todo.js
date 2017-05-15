var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  todo: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false,
    required: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
