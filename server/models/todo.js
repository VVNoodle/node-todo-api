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
  },
  _creator: {
    isAsync: false,
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};
// module.exports.Todo = Todo;
