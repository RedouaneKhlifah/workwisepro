import express from "express";
import userRoutes from "../routes/UserRoutes"
import employeeRoute from "./EmployeeRoutes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/employee", employeeRoute);


export default router;