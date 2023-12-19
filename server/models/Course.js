import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    levels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Level',
        }
    ],

})
const Course = mongoose.model("Course", courseSchema);
export default Course