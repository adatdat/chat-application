import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import passport from 'passport';
import { logs, CLIENT_URL, SERVER_URL, ADMIN_URL } from './vars.js';
import routers from '../routes/index.js';
import logger from './logger.js';

const server = express();
server.use("/", routers);

server.use(helmet());
server.use(morgan(logs, { stream: logger.stream }));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//server.use(express.static(__dirname));

server.use(
  cors({
    origin: [ADMIN_URL, CLIENT_URL, SERVER_URL]
  })
);

export default server;
