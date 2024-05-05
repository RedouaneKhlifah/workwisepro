import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/Db.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// CORS & EJS
app.use(cors());

// Serving images statically

// Using the cookie-parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes

// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
