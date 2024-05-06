import Joi from "joi";

/**
 * @desc schema that defines custom Error Messages
 **/

const customErrorMessages = {
    "string.base": "must be a valid string.",
    "string.pattern.base": "can not contain spaces.",
    "string.min": "must be at least {#limit} characters long.",
    "string.max": "must not exceed {#limit} characters.",
    "string.email": "The email address is not valid.",
    "any.required": "is required.",
    "string.empty": "can not be empty.",
    "number.base": "must be a valid number."
};

 const validator = (schema, data) => {

    const { error } = schema.validate(data, {
        abortEarly: false,
        allowUnknown: true
    });

    if (error) {
        const errors = error.details.map(
            (detail) => {
                const field = detail.path
                    ? Array.isArray(detail.path) && detail.path.length > 1
                        ? detail.path[1]?.toString()
                        : detail.path[0]?.toString()
                    : undefined;

                const errorMessage =
                    customErrorMessages[detail.type] || detail.message;

                return {
                    field: field || "",
                    message: field + " " + errorMessage
                };
            }
        );
        return errors;
    }
    return null

};

export default validator