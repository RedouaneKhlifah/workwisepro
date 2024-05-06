import { Router } from "express";
import {registerUser ,authUser} from "../controllers/UserController"
import MulterUpload from "../utilities/multer";

const router = Router();

router.post("/auth/register",MulterUpload.single("profilePicture"), registerUser);
router.post("/auth/login",authUser );


export default router;
