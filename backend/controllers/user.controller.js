import catchAsync from '../utils/catchAsync.js';
import userService from './../services/index.js';

const userController = {};

userController.getInfo = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { userId } = req.params;
  let idUser = id;
  if (userId) {
    idUser = userId;
  }
  const { userInfo } = await userService.getUserById(idUser);
  res.json({ userInfo });
});

export default userController;
