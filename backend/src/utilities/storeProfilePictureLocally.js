import fs from "fs";
import path from "path";
import { v1 as uuidv1 } from "uuid";

const storeProfilePictureLocally = async (profilePicture) => {
    try {
        const UPLOADS_DIR = path.join(__dirname, "../../../", "storage");
        console.log(__dirname);
        // Ensure the static directory exists
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR);
        }

        // Construct the file path for storing the profile picture
        const ext = profilePicture.originalname.split(".").pop(); // Get file extension
        const fileName =
            Date.now() +
            uuidv1() +
            "-" +
            Math.floor(Math.random() * 1000) +
            "." +
            ext; // Generate unique filename
        const filePath = path.join(UPLOADS_DIR, fileName);

        // Write the file to the server filesystem
        fs.writeFileSync(filePath, profilePicture.buffer);

        console.log("Profile picture saved locally:", filePath);
        return fileName;
    } catch (error) {
        console.error("Error storing profile picture locally:", error);
        throw new Error("Failed to store profile picture locally");
    }
};

export default storeProfilePictureLocally;
