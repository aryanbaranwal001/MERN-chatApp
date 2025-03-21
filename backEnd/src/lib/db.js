import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    const connectData = await mongoose.connect(MONGO_URI);
    console.log('DB connected: ', connectData.connection.host);
  } catch (error) {
    console.log('DB connection failed');
  }
};