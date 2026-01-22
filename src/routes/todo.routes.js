import { Router } from "express";
import { createTodo, getAllTodos, getTodoById, updateTodo,deleteTodo }from "../controllers/todo.controller.js";

const todoRoutes = Router();

todoRoutes.get("/todos", getAllTodos);
todoRoutes.post("/todo", createTodo);
todoRoutes.get("/todo/:id", getTodoById);
todoRoutes.put("/todo/:id", updateTodo);
todoRoutes.delete("/todo/:id", deleteTodo);

export default todoRoutes;