import Emploi from "../models/EmploiModel";

export const ensureUniqueTitle = async (title) => {
    const emploiExist = await Emploi.findOne({
        "infoEmploi.Titre": title
    });

    if (emploiExist) {
        throw new Error("L'emploi est déjà existé.");
    }
};

const createEmploi = async (data) => {
    const { competences, infoEmploi, companyId } = data;
    console.log("createEmploi");
    console.log(competences);
    const newEmploi = await Emploi.create({
        infoEmploi,
        competences,
        companyId
    });
    return newEmploi;
};

const EmploiValidator = async (data) => {
    const { emplois, companyId } = data;

    const ValidCompétences = await Promise.all(
        emplois.map(async (emploi) => {
            // Find the Emploi by its Emploi_id
            const existingEmploi = await Emploi.findOne({
                _id: emploi.Emploi_id,
                companyId
            });

            if (existingEmploi) {
                return {
                    emploi_id: emploi.emploi_id
                };
            }
        })
    );
    return ValidCompétences;
};

const EmploiServices = {
    ensureUniqueTitle,
    createEmploi,
    EmploiValidator
};

export default EmploiServices;
