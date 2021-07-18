import logger from './logger.js';
import mongoose from 'mongoose';
import { DATABASE_URI } from './vars.js';

const connectDatabase = () => {
  mongoose
    .connect(DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => logger.info('Successfully connected to the database'))
    .catch((error) => {
      logger.error(`Could not connect to the database. Exiting now...\n${error}`);
      process.exit(-1);
    });
};

export default connectDatabase;
