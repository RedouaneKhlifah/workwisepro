import Joi from "joi";

export const CreateCompetenceSchema = Joi.object({
    titre: Joi.string().required(),
    typeDeSavoire: Joi.string().required()
});

export const UpdateCompetenceSchema = Joi.object({
    titre: Joi.string().required(),
    typeDeSavoire: Joi.string().required()
});

const CompetenceSchema = {
    CreateCompetenceSchema,
    UpdateCompetenceSchema
};

export default CompetenceSchema;
