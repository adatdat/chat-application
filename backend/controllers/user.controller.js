import catchAsync from '../utils/catchAsync.js';
import userService from './../services/index.js';
import User from '../models/user.model.js';

const userController = {};

userController.getInfo = catchAsync(async (req, res) => {
  try {
    let response = await User.find({});
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: 'load fail'
    });
    console.log(err);
  }
});

export default userController;
