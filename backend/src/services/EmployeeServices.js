import Employee from "../models/employee";

const insertNewEmployee = async (employeeData)=> {
    const employee = new Employee(employeeData);
    await employee.save();
    return employee
}


const EmployeeServices = {
    insertNewEmployee
}

export default EmployeeServices