import User from '../models/user.model.js';

const userService = {};

userService.getUserByName = async (name) => {
  const user = await User.findOne({
    userName: name
  });
  return user;
};

userService.getUserById = async (id) => {
  return await User.findOne({
    userId: id
  });
};

userService.getAll = async () => {
  return await User.find();
};

export default userService;
