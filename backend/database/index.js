'use strict';

import { mongoose } from 'mongoose';

const mongoURI =
  'mongodb+srv://chat-admin:bruhlmao123@cluster-chat.0sque.mongodb.net/chat-application';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

db.sequelize = sequelize;

module.exports = { db };
