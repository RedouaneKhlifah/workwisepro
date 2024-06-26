import express from "express";
import userRoutes from "../routes/UserRoutes";
import employeeRoute from "./EmployeeRoutes";
import calendarRoutes from "./CalendarRoutes";
import authMiddleware from "../middleware/authMiddleware";
import CompetenceRoutes from "./CompetenceRoutes";
import emploiRoute from "./EmploiRoutes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/emploi", authMiddleware, emploiRoute);
router.use("/employee", authMiddleware, employeeRoute);
router.use("/calendar", authMiddleware, calendarRoutes);
router.use("/competence", authMiddleware, CompetenceRoutes);

export default router;
