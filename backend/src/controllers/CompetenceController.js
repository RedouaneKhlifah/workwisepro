/* eslint-disable camelcase */
import asynchandler from "express-async-handler";
import Competence from "../models/CompetenceModel.js";
import UtilsServices from "../services/Utils.js";
import validator from "../validators/JoiSchemas.js";
import CompetenceSchema from "../validators/CompetenceShema.js";
import { sanitizer } from "../utilities/sanitizer";

// Get all Competences
const fetchCompetences = asynchandler(async (req, res) => {
    const page = parseInt(req.query?.page) - 1 || 0;
    const defaultSearch = "titre";
    const search = req.query?.search || "";
    const sort = req.query?.sort || defaultSearch;
    const sortOrder = req.query?.order === "desc" ? -1 : 1;
    const companyId = req.user._id;

    const filterdData = {
        page,
        search,
        sort,
        sortOrder,
        defaultSearch
    };

    const { sortBy, skip, PerPage, query } =
        UtilsServices.SortSearch(filterdData);

    const competences = await Competence.find({ ...query, companyId })
        .sort(sortBy)
        .skip(skip)
        .limit(PerPage);

    const rowCount = await Competence.countDocuments({ query, companyId });

    res.status(200).json({ data: competences, rowCount });
});

// Get specific Competence
const fetchCompetenceById = asynchandler(async (req, res) => {
    const competenceId = req.params.id;
    const companyId = req.user._id;

    const foundCompetence = await Competence.findById({
        _id: competenceId,
        companyId
    });
    if (!foundCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }
    res.status(200).json({ Competence: foundCompetence });
});

// Create a new Competence
const createCompetence = asynchandler(async (req, res) => {
    const { titre, typeDeSavoire } = req.body;
    const companyId = req.user._id;

    const data = {
        titre,
        typeDeSavoire
    };

    const validationErrors = validator(
        CompetenceSchema.CreateCompetenceSchema,
        data
    );

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const foundCompetence = await Competence.findOne({ titre, companyId });

    if (foundCompetence) {
        return res.status(400).json({
            message: "Competence already exists change the title"
        });
    }

    const SanitizedData = sanitizer(data);

    const savedCompetence = await Competence.create({
        ...SanitizedData,
        companyId
    });

    res.status(201).json(savedCompetence);
});

// Update a competence
const updateCompetence = asynchandler(async (req, res) => {
    const competenceId = req.params.id;
    const { titre, typeDeSavoire } = req.body;
    const companyId = req.user._id;

    const data = {
        titre,
        typeDeSavoire
    };

    const validationErrors = validator(
        CompetenceSchema.CreateCompetenceSchema,
        data
    );

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const foundCompetence = await Competence.findById({
        _id: competenceId,
        companyId
    });
    if (!foundCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }

    const SanitizedData = sanitizer(data);

    const updatedCompetence = await Competence.findByIdAndUpdate(
        competenceId,
        SanitizedData,
        { new: true }
    );

    res.json(updatedCompetence);
});

// Delete a competence
const deleteCompetence = asynchandler(async (req, res) => {
    const competenceId = req.params.id;
    const companyId = req.user._id;

    const foundCompetence = await Competence.findById({
        _id: competenceId,
        companyId
    });

    if (!foundCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }
    const deletedCompetence = await Competence.findById({
        _id: competenceId,
        companyId
    });
    res.json(`${deletedCompetence.titre} got succufuly Deleted`);
});

export {
    fetchCompetences,
    fetchCompetenceById,
    createCompetence,
    updateCompetence,
    deleteCompetence
};
