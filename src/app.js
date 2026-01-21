import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";


const app = express();

// middlewares
app.use(express.json());


// Environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});


// Health check route 
app.get("/health", (req,res) => {
    res.send("API is running...and server is healthy now!");
});

// Routes


export default app;