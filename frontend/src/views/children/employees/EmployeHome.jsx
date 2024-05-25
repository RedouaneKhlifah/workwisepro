import PaginateSortSearchHOC from "../../../Higher-order Component/PaginateSortSearchHOC";
import EmployeesSection from "./EmployeesSection";
import Modal from "../../../components/modals/Modal";

const sortOptions = [
    { name: "Titre (asc)", value: "Titre" },
    { name: "Formation (asc)", value: "Formation" },
    { name: "Spécialité (asc)", value: "Spécialité" }
];

function EmployeHome() {
    return (
        <>
            <PaginateSortSearchHOC
                url="api/employee"
                Component={EmployeesSection}
                sortOptions={sortOptions}
                ModalBtn={
                    <Modal
                        modalTitle="ajouter de nouveaux employés"
                        name="ajouter de nouveaux employés"
                        className="pointer-events-auto"
                    />
                }
            />
        </>
    );
}

export default EmployeHome;
