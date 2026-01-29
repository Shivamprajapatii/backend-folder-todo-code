import { Router } from "express";
import { registerUser, loginUser, logOut } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/register", registerUser);
authRoutes.post("/logout", logOut)


export default authRoutes;
