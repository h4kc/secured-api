import express from 'express';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';

import config from './config/config.js';
import logger from "./config/logger.js"
import swaggerSpec from './config/swagger.js';
import greetingRoutes from './routes/greeting.js';
import connectDB from './config/db.js';

const app = express();
app.use(express.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', greetingRoutes); 

connectDB()

const port = config.port;
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});

logger.security("security")
logger.error("error")
logger.http("http")

export default app