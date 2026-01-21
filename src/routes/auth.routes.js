import { Router } from "express";
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/register", registerUser);


export default authRoutes;
