import {
    fetchCompetences,
    fetchCompetenceById,
    createCompetence,
    updateCompetence,
    deleteCompetence
} from "../controllers/CompetenceController.js";
import { Router } from "express";

const router = Router();

// @GET
router.get("/one/:id", fetchCompetenceById);

router.get("/", fetchCompetences);

// autoCompleteCompetence

// @POST
router.post("/", createCompetence);

// @PATCH
router.patch("/:id", updateCompetence);

// @Delete
router.delete("/:id", deleteCompetence);

export default router;
