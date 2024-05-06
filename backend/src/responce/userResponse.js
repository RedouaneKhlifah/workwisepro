
export const userResponse = (user) => {
    const { password,Nom ,Prénom ,email,userType,profilePicture} = user;
    return {Nom ,Prénom ,email,userType,profilePicture};
};