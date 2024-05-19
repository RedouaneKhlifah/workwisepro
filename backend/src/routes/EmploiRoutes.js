import { Router } from "express";
import {
    createEmploi,
    fetchAllEmplois,
    updateEmploi,
    deleteEmploi,
    fetchEmploiById
} from "../controllers/EmploisController.js";

const router = Router();

// Create a new Emploi
router.post("/", createEmploi);

// Get all Emplois
router.get("/", fetchAllEmplois);

// Get one Emploi
router.get("/:id", fetchEmploiById);

// Update an Emploi by ID
router.patch("/:id", updateEmploi);

// Delete an Emploi by ID
router.delete("/:id", deleteEmploi);

export default router;
