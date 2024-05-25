import PaginateSortSearchHOC from "../../../Higher-order Component/PaginateSortSearchHOC";
import EmploisSection from "./EmploisSection";
import Modal from "../../../components/modals/Modal";

// sort options
const sortOptions = [
    { name: "Titre (asc)", value: "Titre" },
    { name: "Formation (asc)", value: "Formation" },
    { name: "Spécialité (asc)", value: "Spécialité" }
];

function EmploiHome() {
    return (
        <PaginateSortSearchHOC
            url="api/emploi"
            Component={EmploisSection}
            sortOptions={sortOptions}
            ModalBtn={
                <Modal
                    modalTitle="ajouter de nouveaux emploi"
                    name="ajouter de nouveaux emploi"
                    className="pointer-events-auto"
                />
            }
        />
    );
}

export default EmploiHome;
