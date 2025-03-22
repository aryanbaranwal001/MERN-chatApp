import express from 'express';
import { signup, login, logout,updateProfile, checkAuth } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const authRoutes = express.Router();

authRoutes.post("/signup", signup) 

authRoutes.post("/login", login) 

authRoutes.post("/logout", logout)


// protectRoute middleware
authRoutes.put("/update-profile", protectRoute, updateProfile)

authRoutes.get("/check", protectRoute, checkAuth)

export {authRoutes};