import asyncHandler from "express-async-handler";
import UserServices from "../services/UserServices";
import userSchemas from "../validators/UserSchema";
import JwtServices from "../utilities/Jwt";
import validator from "../validators/JoiSchemas";
import storeProfilePictureLocally from "../utilities/storeProfilePictureLocally";
/**
 * @desc Auth user & set token
 * @route POST /api/user/auth
 * @access public
 */
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userData = { email, password };

    const validationErrors = validator(userSchemas.LoginUserSchema, userData);
    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const { accessToken } = await UserServices.login(email, password);

    JwtServices.StoreTokenInCockies(res, accessToken);

    res.status(200).json({ message: "You have logged in successfully." });
});

/**
 * @desc register user & set token
 * @route POST /api/user/register
 * @access private
 */

export const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const profilePicture = req?.file;

    const userData = {
        firstName,
        lastName,
        email,
        password,
        userType,
        profilePicture
    };

    const validationErrors = validator(
        userSchemas.RegisterUserSchema,
        userData
    );
    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    await UserServices.ensureUniqueEmail(email);

    let updatedUserData = userData;

    if (profilePicture) {
        const profilePictureName = await storeProfilePictureLocally(
            profilePicture
        );
        updatedUserData = { ...userData, profilePicture: profilePictureName };
    }

    const { user, accessToken } = await UserServices.registerUser(
        updatedUserData
    );

    JwtServices.StoreTokenInCockies(res, accessToken);

    res.status(201).json(user);
});
