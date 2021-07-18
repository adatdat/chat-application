import pkg from 'winston';
const { transports, createLogger, format } = pkg;

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error'
    }),
    new transports.File({ dirname: 'logs', filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

export default logger;
