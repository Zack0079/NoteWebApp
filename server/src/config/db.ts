import mongoose from 'mongoose';
import config  from './config.js';
import { seedDefaultData } from './seed.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      maxPoolSize: config.maxDbPool,
      dbName: 'demoDB',
    });

    console.log(`\x1b[36m%s\x1b[0m`, `=> MongoDB Connected: ${conn.connection.host}`);

    await seedDefaultData();

  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1); // Stop the server if DB fails
  }
};


export default connectDB;