import User from "../models/UserModel";
import JwtServices from "../utilities/Jwt";
import { userResponse } from "../responce/userResponse";
import { checkPasswordCorrcet ,hasher } from "../utilities/Hash";


const createUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
};

export const ensureUniqueEmail = async (
    email
)=> {
    const user = await User.findOne({ email });
    if (user) {
        throw new Error("User email already exists");
    }
};

// Register new user

const registerUser = async (userData) => {
    const newUser = await createUser({...userData ,password : await hasher(userData.password)});
    const accessToken = JwtServices.accessTokenGenerator(newUser._id);
    return { user: newUser, accessToken };
};

const checkUserExistenceByEmail = async (email) =>{
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    return user
}


// Login user
const login = async (email ,password) => {

    const user  = await checkUserExistenceByEmail(email)

    // Compare password
    await checkPasswordCorrcet(password, user.password);

    // Generate access token
    const accessToken = JwtServices.accessTokenGenerator (user._id);
    

    // Return user and access token
    return { user: userResponse(user), accessToken };
};

const UserServices  = {
    registerUser,
    ensureUniqueEmail,
    login,
    checkUserExistenceByEmail
}

export default UserServices;
