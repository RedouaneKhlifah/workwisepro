const Joi = require("joi");

export const CreateCalendarSchema = Joi.object({
    start: Joi.date().iso().required(),
    end: Joi.date().iso().required(),
    title: Joi.string().required()
});

export const UpdateCalendarSchema = Joi.object({
    start: Joi.date().iso().required(),
    end: Joi.date().iso().required(),
    title: Joi.string().required()
});

const calendarSchema = {
    CreateCalendarSchema,
    UpdateCalendarSchema
};

export default calendarSchema;
