import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  levelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  timeTaken: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  passed: {
    type: Boolean,
    default: false,
  },
});

const progressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  levels: {
    type: [levelSchema], 
    default: [],
  },
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
