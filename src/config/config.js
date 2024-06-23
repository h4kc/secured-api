import dotenv from 'dotenv';

dotenv.config();

const config = {
  title:process.env.SERVICE_NAME,
  port: process.env.PORT || 3000,
  db: process.env.DATABASE_URL || 'mongodb://localhost:27017/meeting-api',
  env: process.env.NODE_ENV,
  
};

export default config;
