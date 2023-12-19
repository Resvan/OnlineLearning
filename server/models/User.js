import mongoose from "mongoose";

const completedLevelsSchema = new mongoose.Schema({
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level',
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    passed: {
      type: Boolean,
      required: true,
    },
  });

const courseProgressSchema = new mongoose.Schema({
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    levels: [completedLevelsSchema],
  });

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
    progress: [courseProgressSchema],
})
const User = mongoose.model("User", userSchema);
export default User