import mongoose from "mongoose";

const emploiSchema = mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    infoEmploi: {
        Titre: {
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
        Expérience: {
            type: String,
            trim: true,
            required: true
        }
    },
    competences: [
        {
            competence_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "competence"
            },
            Niveau: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Emploi = mongoose.model("emplois", emploiSchema);

export default Emploi;
