import PaginateSortSearchHOC from "../../../Higher-order Component/PaginateSortSearchHOC";
import EmployeesSection from "./EmployeesSection";

const sortOptions = [
    { name: "Titre (asc)", value: "Titre" },
    { name: "Formation (asc)", value: "Formation" },
    { name: "Spécialité (asc)", value: "Spécialité" }
];

function EmployeHome() {
    return (
        <PaginateSortSearchHOC
            url="api/employee"
            Component={EmployeesSection}
            sortOptions={sortOptions}
        />
    );
}

export default EmployeHome;
