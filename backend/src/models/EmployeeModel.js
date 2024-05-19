import mongoose from "mongoose";

// Creating a new schema for users using mongoose
const employeeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    personalInfo: {
        FullName: {
            type: String,
            trim: true
        },
        CIN: {
            type: String,
            trim: true,
            required: true
        },
        Téléphone: {
            type: String,
            trim: true,
            required: true,
            default: "0000000000"
        },
        "Date de naissance": {
            type: Date,
            trim: true,
            required: true
        },
        Sexe: {
            // Masculin, Féminin
            type: String,
            trim: true,
            required: true
        },
        "Situation familiale": {
            // Célibataire, Marié(e), Divorcé(e), Veuf(ve)
            type: String,
            trim: true,
            required: true
        },

        Localisation: {
            type: String,
            trim: true,
            required: true
        }
    },
    professionalInfo: {
        Direction: {
            type: String,
            trim: true,
            required: true
        },
        Grade: {
            type: String,
            trim: true,
            required: true
        },
        Catégorie: {
            type: String,
            trim: true,
            required: true
        },
        Formation: {
            type: String,
            trim: true,
            required: true
        },
        Spécialité: {
            type: String,
            trim: true,
            required: true
        },
        Département: {
            type: String,
            trim: true
        },
        "Date de recrutement": {
            type: Date,
            trim: true,
            required: true
        },
        "Service extérieur": {
            type: String,
            trim: true,
            required: true
        }
    },
    competences: [
        {
            competence_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "competence",
                required: true
            },
            Niveau: {
                type: Number,
                trim: true,
                required: true
            }
        }
    ],
    emplois: [
        {
            emploi_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "emploi"
            },
            Niveau: {
                type: Number
            }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

// Creating a new User model using the userSchema
const Employee = mongoose.model("employee", employeeSchema);

// Exporting the User model for use in other parts of the application
export default Employee;
