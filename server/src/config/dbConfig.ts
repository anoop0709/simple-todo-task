import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGO_DB_URL;

export const connectDb = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is required in environment variables.');
    }
    const dbConnection = await mongoose.connect(MONGODB_URI! as string);
    console.log(`MongoDB Connected: ${dbConnection.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
