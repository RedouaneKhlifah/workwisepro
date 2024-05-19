import Competence from "../models/CompetenceModel";

const CompetenceValidator = async (data) => {
    const { competences, companyId } = data;

    const ValidCompétences = await Promise.all(
        competences.map(async (competence) => {
            // Find the competence by its competence_id
            const existingCompetence = await Competence.findOne({
                _id: competence.competence_id,
                companyId
            });

            if (existingCompetence) {
                return {
                    competence_id: competence.competence_id,
                    Niveau: competence.Niveau
                };
            } else {
                return null;
            }
        })
    );
    return ValidCompétences.filter((competence) => competence !== null);
};

const competenceServices = {
    CompetenceValidator
};

export default competenceServices;
