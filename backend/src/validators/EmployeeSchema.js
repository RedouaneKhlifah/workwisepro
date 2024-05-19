import Joi from "joi";
import userSchemas from "./UserSchema";

export const createEmployeeSchema = Joi.object({
    userInfo: userSchemas.RegisterUserSchema.required(),
    personalInfo: Joi.object({
        CIN: Joi.string().trim().required(),
        Téléphone: Joi.string().trim().default("0000000000").required(),

        "Date de naissance": Joi.date().required(),
        Sexe: Joi.string().trim().valid("Masculin", "Féminin").required(),
        "Situation familiale": Joi.string()
            .trim()
            .valid("Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)")
            .required(),
        Localisation: Joi.string().trim().required()
    }).required(),

    professionalInfo: Joi.object({
        Direction: Joi.string().trim().required(),
        Grade: Joi.string().trim().required(),
        Catégorie: Joi.string().trim().required(),
        Formation: Joi.string().trim().required(),
        Spécialité: Joi.string().trim().required(),
        Département: Joi.string().trim().required(),
        "Date de recrutement": Joi.date().required(),
        "Service extérieur": Joi.string().trim().required()
    }).required(),
    competences: Joi.array()
        .items(
            Joi.object({
                competence_id: Joi.string().required(), // Assuming competence_id is a string
                Niveau: Joi.number().required() // Assuming Niveau is a number
            })
        )
        .optional(),
    emplois: Joi.array()
        .items(
            Joi.object({
                emploi_id: Joi.string().required() // Assuming emploi_id is a string
            })
        )
        .optional()
});

const employeeSchemas = {
    createEmployeeSchema
};

export default employeeSchemas;
