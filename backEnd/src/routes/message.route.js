import express from 'express';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';



const messageRoutes = express.Router();


messageRoutes.get("/users", protectRoute, getUsersForSidebar)

messageRoutes.get("/messages/:otherPersonId", protectRoute, getMessages)

messageRoutes.post("/send/:receiverId", protectRoute, sendMessage)


export {messageRoutes};