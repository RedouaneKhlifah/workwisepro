function CompetanceTable({ data = [] }) {
    return (
        <>
            <div className="mt-6 bg-white overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th
                                scope="col"
                                className=" py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-20"
                            >
                                Compétences
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                            >
                                Type de savoir
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data.map((competence) => (
                            <tr key={competence._id}>
                                <td className="w-6/12 py-4  pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 hover:underline cursor-pointer sm:pl-20">
                                    {competence.titre}
                                </td>
                                <td className="w-5/12 px-3 py-4 text-sm text-gray-700">
                                    {competence.typeDeSavoire}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CompetanceTable;
