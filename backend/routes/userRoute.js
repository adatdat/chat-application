// const router = require('express').Router();
// const requireToken = require('../middlewares/auth.mdw');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const userModel = require('../models/user.model');

// router.post('/login', async (req, res, next) => {
//   const { username, password } = req.body;
//   const user = await userModel.singleByUsername(username);

//   if (user === null)
//     return res.status(404).json({
//       message: 'Not found !',
//     });

//   const rs = bcrypt.compareSync(password, user.password);
//   if (!rs)
//     return res.status(403).json({
//       message: 'Wrong password !',
//     });

//   const token = jwt.sign({ user: username }, 'anhem1nha', {
//     expiresIn: '1h',
//     algorithm: 'HS256',
//   });

//   delete user.password;

//   return res.status(200).json({ user, token, message: 'Login successful !' });
// });

// router.get('/list', requireToken, async (req, res, next) => {
//   let listUser = await userModel.getAllUser();
//   if (listUser !== null) {
//     listUser = listUser.map((user, i) => {
//       user.key = i;
//       if (user.permission === 0) {
//         user.permission = 'Receptionist';
//       } else if (user.permission === 1) {
//         user.permission = 'Manager';
//       }
//       user.password = '********';
//       return user;
//     });
//     if (listUser)
//       return res.status(200).json({ listUser, message: 'Successful !' });
//     else return res.status(403).json({ message: 'Somethings went wrongs!' });
//   } else {
//     res.status(204).json({ message: 'No content' });
//   }
// });
// module.exports = router;