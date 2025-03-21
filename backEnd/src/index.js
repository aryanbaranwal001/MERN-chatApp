import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import {authRoutes} from './routes/auth.route.js';
import {connectDB} from './lib/db.js';

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;


const app = express();


app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
  console.log('Server is running on port:'  + PORT);
  connectDB();
})