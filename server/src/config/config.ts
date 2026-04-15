import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
});

if (!process.env.MONGODB_URI || !process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error("One or more required environment variables are missing");
}

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'dev',
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  maxDbPool: parseInt(process.env.MAX_DB_CONNECTIONS || '10'),
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY ? parseInt(process.env.ACCESS_TOKEN_EXPIRY) : 3600, // default to 1 hour
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY ? parseInt(process.env.REFRESH_TOKEN_EXPIRY) : 7200, // default to 2 hours
  updateRefreshTokenLimit: process.env.UPDATE_REFRESH_TOKEN_LIMIT ? parseInt(process.env.UPDATE_REFRESH_TOKEN_LIMIT) : 3600, // default to 1 hour
};

export default config;