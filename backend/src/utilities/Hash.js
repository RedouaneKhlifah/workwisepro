import bcrypt from "bcrypt";

export async function hasher(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const checkPasswordCorrcet = async (
    password,
    userPassword
) => {
    const match = await bcrypt.compare(password, userPassword);
    if (!match) {
        throw new Error("L'e-mail ou le mot de passe est incorrect.");
    }
};