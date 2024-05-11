import { Router } from "express";
import {
    createEmployee,
    fetchEmployees
} from "../controllers/EmpoyeeController";
import MulterUpload from "../utilities/multer";

const router = Router();

router.post("/", MulterUpload.single("profilePicture"), createEmployee);
router.get("/", fetchEmployees);

export default router;
