import mongoose from "mongoose";


const levelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String, required: true },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    assignments: [],
});

const Level = mongoose.model('Level', levelSchema);

export default Level;
