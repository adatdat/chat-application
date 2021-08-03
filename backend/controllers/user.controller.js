import catchAsync from '../utils/catchAsync.js';
import userService from './../services/index.js';
import User from '../models/user.model.js';

const userController = {};

userController.getInfo = catchAsync(async (req, res) => {
  try {
    let response = await User.find({});
    console.log(response)
    return res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      message: 'load fail'
    });
    console.log(err);
  }
});


userController.login = catchAsync(async (req, res) => {
  try {
    console.log("zo day",req.Body);
    const { username , password} = req.body;
    const user = await User.findOne({ username: username})
    if(user) {
      if(user.password === password) {
        return res.status(200).json(user);
      }else{
        return res.status(401).json({
          message: 'Error password!'
        });
      }
    }else{
      return res.status(401).json({
        message: 'Not found username!'
      });
    }
  } catch (err) {
    res.status(400).json({
      message: 'load fail'
    });
    console.log(err);
  }
});

export default userController;
