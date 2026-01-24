import { Router } from "express";
import {isLoggedIn} from "../middleware/auth.middleware.js";

import { createTodo, getAllTodos, getTodoById, updateTodo,deleteTodo }from "../controllers/todo.controller.js";

const todoRoutes = Router();

todoRoutes.get("/", isLoggedIn, getAllTodos);
todoRoutes.post("/", isLoggedIn, createTodo);
todoRoutes.get("/:id", isLoggedIn, getTodoById);
todoRoutes.put("/:id", isLoggedIn,updateTodo);
todoRoutes.delete("/:id", isLoggedIn, deleteTodo);

export default todoRoutes;