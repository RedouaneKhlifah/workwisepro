const SortSearch = (data) => {
    const sortBy = {};

    sortBy[`${data.sort}`] = data.sortOrder;

    const query = {};
    if (data.search) {
        query[data.defaultSearch] = { $regex: data.search, $options: "i" };
    }

    const PerPage = 12;

    const skip = data.page * PerPage;

    return { sortBy, skip, PerPage, query };
};

const UtilsServices = {
    SortSearch
};

export default UtilsServices;
