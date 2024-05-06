import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/Db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import multer from 'multer';



import "./utilities/index";

// imported routes
import router from "./routes";

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

// CORS & EJS
app.use(cors());

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination directory
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});

const upload = multer({ storage: storage });



// Using the cookie-parser middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Routes
// use routes
app.use("/api", router);
// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
