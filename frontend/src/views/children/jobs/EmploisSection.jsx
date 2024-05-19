import CardEmploi from "../../../components/CardEmploi";

function EmploisSection({ data }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 m-1.5 z-0 ">
            {data.map((element) => (
                <CardEmploi key={element._id} data={element} />
            ))}
        </div>
    );
}

export default EmploisSection;
