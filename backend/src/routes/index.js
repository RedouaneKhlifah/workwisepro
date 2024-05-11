import express from "express";
import userRoutes from "../routes/UserRoutes";
import employeeRoute from "./EmployeeRoutes";
import calendarRoutes from "./CalendarRoutes";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/employee", employeeRoute);
router.use("/calendar", authMiddleware, calendarRoutes);

export default router;
