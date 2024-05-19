import asyncHandler from "express-async-handler";
import Emploi from "../models/EmploiModel.js";
import Competence from "../models/CompetenceModel.js";
import User from "../models/UserModel.js";
import UtilsServices from "../services/Utils.js";
import EmploiServices from "../services/EmploiService.js";
import competenceServices from "../services/CompetenceServices.js";

// @desc    Create a new emploi
// @route   POST /api/emplois
// @access  Public

const createEmploi = asyncHandler(async (req, res) => {
    const { competences = [], infoEmploi } = req.body;

    await EmploiServices.ensureUniqueTitle(infoEmploi.Titre);
    const companyId = req.user._id;

    const data = {
        competences,
        infoEmploi,
        companyId
    };

    data.competences =
        competences.length > 0
            ? await competenceServices.CompetenceValidator(data)
            : [];

    const newEmploi = await EmploiServices.createEmploi(data);

    res.status(201).json({
        message: "L'emploi a été créé avec succès.",
        data: newEmploi
    });
});

// @desc    Get all emplois
// @route   GET /api/emplois
// @access  Public

const fetchAllEmplois = asyncHandler(async (req, res) => {
    const page = parseInt(req.query?.page) - 1 || 0;
    const defaultSearch = "infoEmploi.Titre";
    const search = req.query?.search;
    const sort = req.query?.sort || "Titre";
    const sortOrder = req.query?.order === "desc" ? -1 : 1;
    const companyId = req.user._id;

    const filterdData = {
        page,
        search,
        sort: `infoEmploi.${sort}`,
        sortOrder,
        defaultSearch
    };

    const { sortBy, skip, PerPage, query } =
        UtilsServices.SortSearch(filterdData);

    const emplois = await Emploi.find({ ...query, companyId })
        .sort(sortBy)
        .skip(skip)
        .limit(PerPage)
        .collation({ locale: "en", strength: 2 });

    const rowCount = await Emploi.countDocuments({ ...query, companyId });

    res.status(200).json({ data: emplois, rowCount });
});

// @desc    Get a single emploi by ID
// @route   GET /api/emplois/:id
// @access  Public

const fetchEmploiById = asyncHandler(async (req, res) => {
    const emploiId = req.params.id;
    const emploi = await Emploi.findById(emploiId)
        .populate({
            path: "competences.competence_id",
            model: Competence
        })
        .populate({
            path: "companyId",
            model: User
        });

    if (!emploi) {
        res.status(404);
        throw new Error("L'emploi spécifié n'a pas été trouvé.");
    }

    res.status(200).json(emploi);
});

// @desc    Update an emploi by ID
// @route   PUT /api/emplois/:id
// @access  Public

const updateEmploi = asyncHandler(async (req, res) => {
    const emploiId = req.params.id;
    const { Competences, infoEmploi } = req.body;
    const companyId = req.user._id;
    const existingEmploi = await Emploi.findOne({ _id: emploiId, companyId });

    if (!existingEmploi) {
        res.status(404);
        throw new Error("L'emploi spécifié n'a pas été trouvé.");
    }

    const data = {
        Competences,
        infoEmploi
    };

    data.Competences =
        Competences.length > 0
            ? await competenceServices.CompetenceValidator(data)
            : [];

    // Update the Emploi document with the provided data
    const updatedEmploi = await Emploi.findByIdAndUpdate(emploiId, data, {
        new: true
    });

    res.status(200).json({
        message: "L'emploi a été mis à jour avec succès.",
        data: updatedEmploi
    });
});

// @desc    Delete an emploi by ID
// @route   DELETE /api/emplois/:id
// @access  Public
const deleteEmploi = asyncHandler(async (req, res) => {
    const emploiId = req.params.id;

    const deletedEmploi = await Emploi.findByIdAndDelete(emploiId);

    if (!deletedEmploi) {
        res.status(404);
        throw new Error("L'emploi spécifié n'a pas été trouvé.");
    }

    res.status(200).json({
        message: "L'emploi a été supprimé avec succès.",
        data: deletedEmploi
    });
});

export {
    createEmploi,
    fetchAllEmplois,
    fetchEmploiById,
    updateEmploi,
    deleteEmploi
};
