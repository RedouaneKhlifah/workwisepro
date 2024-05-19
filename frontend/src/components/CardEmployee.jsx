import { Link } from "react-router-dom";
import Avatar from "./utils/Avatar";
import ANEPBtn from "./utils/ANEPBtn";

function CardEmployee({ data }) {
    const { professionalInfo, userId, personalInfo, emplois = [], id } = data;
    const { profilePicture } = userId;
    const { FullName } = personalInfo;
    const { Grade } = professionalInfo;

    console.log(Grade);

    return (
        <div className="w-full p-4 flex flex-col justify-between items-stretch gap-y-6 bg-anep-secondary rounded-lg drop-shadow-md">
            <div className="flex justify-between items-center gap-x-3">
                <Avatar
                    src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
                    size="xxl"
                />
                <div>
                    <h2 className="text-xl text-black font-bold text-center">
                        {FullName}
                    </h2>
                    <h3 className="text-anep-dark font-semibold text-center">
                        {Grade}
                    </h3>
                </div>
            </div>
            <div className="flex flex-col justify-between items-start gap-y-2 child:px-2.5 child:py-1 child:bg-blue-100 child:border child:border-blue-300 child:rounded-full">
                {emplois.map((emploi, i) => (
                    <h4 key={i}>{emploi.emploi_id.infoEmploi.Titre}</h4>
                ))}
            </div>
            <div className="flex justify-center">
                <Link className="rounded-lg">
                    <ANEPBtn name="Explorer le profil" />
                </Link>
            </div>
        </div>
    );
}

export default CardEmployee;
