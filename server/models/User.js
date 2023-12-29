import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePic: {
        type: String,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
})
const User = mongoose.model("User", userSchema);
export default User