const mongoose = require('mongoose');

const User = new mongoose.Schema({
  userId: {
    type: Int64,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
  }
});

const User = mongoose.model('User', User);

module.exports = User;
