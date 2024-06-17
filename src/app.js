// src/index.js
import express from 'express';
import config from './config/config.js';
import logger from "./config/logger.js"
const app = express();

app.get('/greeting', (req, res) => {
  res.sendStatus(200);
});

const port = config.port;
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

logger.security("security")
logger.error("error")
logger.http("http")

export default app