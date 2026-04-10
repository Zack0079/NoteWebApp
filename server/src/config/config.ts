import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from .env file");
}

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
  maxDbPool: parseInt(process.env.MAX_DB_CONNECTIONS || '10'),
};

export default config;