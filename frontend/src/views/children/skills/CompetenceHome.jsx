import CompetanceTable from "../../../components/CompetenceTable";
import PaginateSortSearchHOC from "../../../Higher-order Component/PaginateSortSearchHOC";
import Modal from "../../../components/modals/Modal";

const sortOptions = [
    { name: "Titre (asc)", value: "Titre" },
    { name: "Formation (asc)", value: "Formation" },
    { name: "Spécialité (asc)", value: "Spécialité" }
];

function CompetenceHome() {
    return (
        <PaginateSortSearchHOC
            url="api/competence"
            Component={CompetanceTable}
            sortOptions={sortOptions}
            ModalBtn={
                <Modal
                    modalTitle="ajouter de nouveaux compétence"
                    name="ajouter de nouveaux compétence"
                    className="pointer-events-auto"
                />
            }
        />
    );
}

export default CompetenceHome;
