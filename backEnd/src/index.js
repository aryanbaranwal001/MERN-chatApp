import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import {authRoutes} from './routes/auth.route.js';
import {messageRoutes} from './routes/message.route.js';
import {connectDB} from './lib/db.js';

const PORT = process.env.PORT || 3001;




const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)


app.listen(PORT, () => {
  console.log('Server is running on port:'  + PORT);
  connectDB();
})