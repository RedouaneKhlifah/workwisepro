import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies["jwt-token"];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId, {
                password: 0,
                history: 0
            });

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export default authMiddleware;
