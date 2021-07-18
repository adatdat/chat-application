import mongoose from 'mongoose';

const userChema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

const User = mongoose.model('User', userChema);

export default User;
