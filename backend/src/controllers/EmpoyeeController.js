import asyncHandler from "express-async-handler";
import Employee from "../models/employee";
import validator from "../validators/JoiSchemas"
import employeeSchemas from "../validators/EmployeeSchema";
import UserServices from "../services/UserServices";
import EmployeeServices from "../services/EmployeeServices";
import JwtServices from "../utilities/Jwt";
import { sanitizer } from "../utilities/sanitizer";


export const createEmployee = asyncHandler(async (req, res) => {

    const {email} = req.body?.userInfo

    const validationErrors = validator(employeeSchemas.createEmployeeSchema, req.body);
    if (validationErrors) {
       res.status(400).json({ errors: validationErrors });
       return;
   }

   await UserServices.ensureUniqueEmail(email)

   const SanitizedData = sanitizer(req.body);


   const {userInfo ,personalInfo , professionalInfo} = SanitizedData

   const  {user } = await UserServices.registerUser(userInfo)

   const employeeData  = {
    user_id : user._id,
    personalInfo : {FullName : `${user.Prénom} ${user.Nom}`,...personalInfo  },
    professionalInfo
   }

   const employee = await EmployeeServices.insertNewEmployee(employeeData)

   res.status(201).json( employee );

})


const fetchEmployees = asyncHandler(async (req, res) => {

    const page = parseInt(req.query?.page) - 1 || 0;
    const search = req.query?.search || "";
    const sort = req.query?.sort || "FullName";
    const sortOrder = req.query?.order === "desc" ? -1 : 1;

    const sortBy = {};
    sortBy[`personalInfo.${sort}`] = sortOrder;

    const query = {};
    if (search) {
        query["personalInfo.FullName"] = { $regex: search, $options: "i" };
    }

    const employeesPerPage = 12;

    const skip = page * employeesPerPage;

    const employees = await Employee.find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(employeesPerPage);

        const rowCount = await Employee.countDocuments(query);
        res.status(200).json({ data : employees, rowCount });
});

export { fetchEmployees };
