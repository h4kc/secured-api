import { createLogger, format, transports } from 'winston';
import { addColors } from 'winston';

const { combine, timestamp, errors, json } = format;

// Custom log levels
const customLevels = {
  levels: {
    security: 0,
    error: 1, 
    http:2,
    info: 3,
  }
};


// Apply colors to custom levels
addColors(customLevels.colors);



const logger = createLogger({
  levels: customLevels.levels,
  level: 'info',
  format:  combine(timestamp(), json(),errors({ stack: true })),
  defaultMeta: { service: process.env.NODE_ENV, environment:process.env.SERVICE_NAME },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: 'logs/http.log', level: 'http' }), // Log http messages to file
    new transports.File({ filename: 'logs/security.log', level: 'security' }), // Log security messages to file
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
    new transports.File({ filename: 'logs/combined.log' }) // Log all messages to file
  
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export default logger