import express from 'express';
import userRouter from './user.route.js';

const router = express.Router();

router.get('/status', (_, res) =>
  res.json({
    message: 'Everything looks good'
  })
);

router.get('/', (_, res) =>
  res.json({
    message: 'Everything looks good'
  })
);

router.use('/user', userRouter);

export default router;
