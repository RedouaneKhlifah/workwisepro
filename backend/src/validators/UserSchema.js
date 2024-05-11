import Joi from "joi";

export const RegisterUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    userType: Joi.number().integer().min(1).max(5).default(5),
    profilePicture: Joi.object({
        encoding: Joi.string()
            .valid("7bit", "8bit", "binary", "base64")
            .required(), // Validate encoding
        mimetype: Joi.string()
            .valid("image/jpeg", "image/png", "image/gif")
            .when("encoding", {
                is: Joi.string().valid("7bit", "8bit", "binary").required(),
                then: Joi.string()
                    .valid("image/jpeg", "image/png", "image/gif")
                    .default("image/jpeg"),
                otherwise: Joi.string().valid(
                    "image/jpeg",
                    "image/png",
                    "image/gif"
                )
            })
            .required(), // Validate mimetype
        size: Joi.number()
            .max(2 * 1024 * 1024) // Validate size (2MB)
            .when(".", {
                // '.' denotes the current object (profilePicture)
                is: Joi.object({
                    encoding: Joi.string()
                        .valid("7bit", "8bit", "binary")
                        .required() // Ensure encoding is present
                }).required(),
                then: Joi.number()
                    .max(2 * 1024 * 1024)
                    .error(
                        new Error("Profile picture size should not exceed 2MB")
                    ) // Custom error message for size exceeding 2MB
            })
    }).optional()
});

const LoginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const userSchemas = {
    RegisterUserSchema,
    LoginUserSchema
};

export default userSchemas;
