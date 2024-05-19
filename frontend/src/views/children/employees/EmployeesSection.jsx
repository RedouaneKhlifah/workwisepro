import CardEmployee from "../../../components/CardEmployee";

function EmployeesSection({ data }) {
    return (
        <div className="mt-6 grid grid-cols-3 justify-items-center items-start gap-3">
            {data?.map((element) => (
                <CardEmployee key={element._id} data={element} />
            ))}
        </div>
    );
}

export default EmployeesSection;
