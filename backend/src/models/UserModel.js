import mongoose from "mongoose";

// Creating a new schema for users using mongoose
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        default: 5
        /**
         * 1 == Super Admin
         * 2 == Admin
         * 3 == Read-only Admin
         * 4 == Trainer (Formateur)
         * 5 == Employee
         */
    },
    profilePicture: {
        type: String,
        default: "test"
    }
});

// Set global option to always exclude the password field
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        // Exclude the password field
        delete ret.password;
        return ret;
    }
});

// Creating a new User model using the userSchema
const User = mongoose.model("user", userSchema);

// Exporting the User model for use in other parts of the application
export default User;
