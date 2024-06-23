import { createLogger, format, transports } from "winston";
import config from "./config.js";
const { combine, timestamp, errors, json } = format;

const errorFilter = format((info, opts) => {
  return info.level === "error" ? info : false;
});

const httpFilter = format((info, opts) => {
  return info.level === "http" ? info : false;
});
const dbFilter = format((info, opts) => {
  return info.level === "db" ? info : false;
});
const customLevels = {
  levels: {
    security: 0,
    error: 1,
    http: 2,
    db:3,
    info: 4,
  },
};
const logger = createLogger({
  levels: customLevels.levels,
  level: "info",
  format: combine(timestamp(), json(), errors({ stack: true })),
  defaultMeta: {
    environment: config.env,
    service: config.title,
  },
  transports: [
    new transports.File({ filename: "logs/security.log", level: "security" }), 
    new transports.File({
      filename: "logs/http.log",
      level: "http",
      format: combine(
        httpFilter(),
        errors({ stack: true }),
        timestamp(),
        json()
      ),
    }), 
    new transports.File({
      filename: "logs/db.log",
      level: "db",
      format: combine(
        dbFilter(),
        errors({ stack: true }),
        timestamp(),
        json()
      ),
    }), 
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(
        errorFilter(),
        errors({ stack: true }),
        timestamp(),
        json()
      ),
    }), 
    new transports.File({ filename: "logs/combined.log" }), // Log all messages to file
  ],
});

if (config.env !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
