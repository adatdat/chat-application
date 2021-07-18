import { port, env } from './config/vars.js';
import server from './config/express.js';
import logger from './config/logger.js';
import connectDatabase from './config/sequelize.js';

connectDatabase();

server.listen(port, () => logger.info(`Server started on port ${port}: ${env}`));

export default server;
