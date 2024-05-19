import PaginateSortSearchHOC from "../../../Higher-order Component/PaginateSortSearchHOC";
import EmploisSection from "./EmploisSection";

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
        />
    );
}

export default EmploiHome;
