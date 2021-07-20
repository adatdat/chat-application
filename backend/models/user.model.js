import mongoose from 'mongoose';

const userChema = new mongoose.Schema({
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
