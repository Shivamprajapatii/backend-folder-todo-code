import { Router } from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";


const userRoutes = Router();

userRoutes.put("/users",createUser);
userRoutes.get("/users",getUsers);

export default userRoutes;