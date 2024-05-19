import Employee from "../models/EmployeeModel";
import UserServices from "../services/UserServices";
import mongoose from "mongoose";

const insertNewEmployee = async (employeeData, session) => {
    const employee = new Employee(employeeData);
    await employee.save({ session });
    return employee;
};

const insertEmployeetranstction = async (data) => {
    const { userInfo, personalInfo, professionalInfo, emplois, companyId } =
        data;

    // const db = getDb();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { user } = await UserServices.registerUser(userInfo, session);

        console.log("emplois");
        console.log(emplois);

        const employeeData = {
            userId: user._id,
            companyId,
            personalInfo: {
                FullName: `${user.firstName} ${user.lastName}`,
                ...personalInfo
            },
            professionalInfo,
            emplois
        };

        // Pass the session to the insertNewEmployee function
        const employee = await EmployeeServices.insertNewEmployee(
            employeeData,
            session
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return employee;
    } catch (err) {
        // Rollback the transaction
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
};
const EmployeeServices = {
    insertNewEmployee,
    insertEmployeetranstction
};

export default EmployeeServices;
