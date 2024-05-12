const SortCompetence = (data) => {
    const sortBy = {};
    sortBy[`${data.sort}`] = data.sortOrder;

    const query = {};
    if (data.search) {
        query.titre = { $regex: data.search, $options: "i" };
    }

    const PerPage = 12;

    const skip = data.page * PerPage;

    return { sortBy, skip, data };
};

const CompetenceServices = {
    SortCompetence
};

export default CompetenceServices;
