import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
// import passport from 'passport';
import { logs, CLIENT_URL, SERVER_URL, ADMIN_URL } from './vars.js';
import routers from '../routes/index.js';
import logger from './logger.js';
import bodyParser from 'body-parser'

import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const socketio = new Server(server);


socketio.on('connection' , socket =>{
    console.log('New connection	')
})
app.use("/", routers);

app.use(helmet());
app.use(morgan(logs, { stream: logger.stream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.static(__dirname));

app.use(cors())

export default app;
