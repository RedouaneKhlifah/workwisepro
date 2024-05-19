import mongoose from "mongoose";

const CompetencesSchema = mongoose.Schema({
    titre: {
        type: String,
        required: [true, "please fill the titre"]
    },
    typeDeSavoire: {
        type: String,
        required: [true, "please choose the a type"]
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});

const Competence = mongoose.model("competence", CompetencesSchema);

export default Competence;
