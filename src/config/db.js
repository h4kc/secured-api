import mongoose from 'mongoose';
import config from './config.js';
import logger from './logger.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.db);
    logger.db('MongoDB connected successfully');
  } catch (error) {
    logger.db('MongoDB connection error:', error.message);
    process.exit(1); 
  }
};

export default connectDB;
