import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/info', userController.getInfo);
router.post('/login', userController.login);

export default router;
