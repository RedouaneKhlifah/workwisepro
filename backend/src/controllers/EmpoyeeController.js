import asyncHandler from "express-async-handler";
import Employee from "../models/EmployeeModel";
import validator from "../validators/JoiSchemas";
import employeeSchemas from "../validators/EmployeeSchema";
import UserServices from "../services/UserServices";
import EmployeeServices from "../services/EmployeeServices";
import { sanitizer } from "../utilities/sanitizer";
import UtilsServices from "../services/Utils";
import User from "../models/UserModel.js";
import Emploi from "../models/EmploiModel.js";
import Competence from "../models/CompetenceModel.js";

export const createEmployee = asyncHandler(async (req, res) => {
    const { email } = req.body?.userInfo;
    const { emplois = [] } = req.body;

    console.log("Controller");
    console.log(emplois);

    if (emplois.length === 0) {
        res.status(400).json("employee must have at least one job ");
        return;
    }

    const validationErrors = validator(
        employeeSchemas.createEmployeeSchema,
        req.body
    );
    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    await UserServices.ensureUniqueEmail(email);
    const SanitizedData = sanitizer(req.body);
    SanitizedData.emplois = emplois;

    const employee = await EmployeeServices.insertEmployeetranstction({
        ...SanitizedData,
        companyId: req.user._id
    });

    res.status(201).json(employee);
});

const fetchEmployees = asyncHandler(async (req, res) => {
    const page = parseInt(req.query?.page) - 1 || 0;
    const defaultSearch = "personalInfo.FullName";
    const search = req.query?.search;
    const sort = req.query?.sort || "FullName";
    const sortOrder = req.query?.order === "desc" ? -1 : 1;

    const companyId = req?.user?._id;

    const filterdData = {
        page,
        search,
        sort: `personalInfo.${sort}`,
        sortOrder,
        defaultSearch
    };

    const { sortBy, skip, PerPage, query } =
        UtilsServices.SortSearch(filterdData);

    const employees = await Employee.find({
        ...query,
        companyId
    })
        .sort(sortBy)
        .skip(skip)
        .limit(PerPage)
        .collation({ locale: "en", strength: 2 })
        .populate({
            path: "userId",
            model: User,
            as: "user"
        })
        .populate({
            path: "emplois.emploi_id",
            model: Emploi,
            populate: {
                path: "competences.competence_id",
                model: Competence
            }
        });

    const rowCount = await Employee.countDocuments({ ...query, companyId });

    res.status(200).json({ data: employees, rowCount });
});

export { fetchEmployees };
