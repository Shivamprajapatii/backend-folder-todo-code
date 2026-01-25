import express from "express"
const app = express();
import authRoutes from "./routes/auth.routes.js"
import todoRoutes from "./routes/todo.routes.js"
import userRoutes from "./routes/user.routes.js"
import errorHandler from "./middleware/error.middleware.js";

// middlewares
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/users", userRoutes);

// Health check route 
app.get("/health", (req, res) => {
    res.send("API is running...and server is healthy now!");
});

// ❌ 404 handler Page Not Found)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Page not found: ${req.originalUrl}`,
    });
});

// Error handling middleware
app.use(errorHandler);

export default app;