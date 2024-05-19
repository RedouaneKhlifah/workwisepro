import { Router } from "express";
import {
    registerUser,
    authUser,
    getUserProfile
} from "../controllers/UserController";
import MulterUpload from "../utilities/multer";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post(
    "/auth/register",
    MulterUpload.single("profilePicture"),
    registerUser
);
router.post("/auth/login", authUser);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
