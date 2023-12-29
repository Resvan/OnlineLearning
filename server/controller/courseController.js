import mongoose, {Types} from "mongoose";
import cloudinary from "../config/cloudinery.js";
import Course from "../models/Course.js";
import Level from "../models/Level.js";
import Progress from "../models/Progress.js";
import User from "../models/User.js";





export const addCourse = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
   
        const result = await cloudinary.uploader.upload(req.file.path, {
           folder: "Online_learning"
        });

        const { title, description } = req.body;
        const { id } = req.user;


        const newCourse = new Course({
            title,
            description,
            owner: id,
            image: result.secure_url,
        });

        const savedCourse = await newCourse.save();
        

        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find().populate("owner");
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const addLevels = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
   
        const result = await cloudinary.uploader.upload(req.file.path, {
         folder: "Online_learning"
        });

        const { title, description, course, questions } = req.body;

        const level = new Level({
            title,
            description,
            video:result.secure_url,
            course,
            assignments: questions
        })


        const savedLevel = await level.save();

        
        const levels = await Level.find();



        res.status(201).json(levels);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const enrollCourse = async (req, res)=>{
    try {
        const {id} = req.user;
        const user = await User.findByIdAndUpdate(
            id,
            { $push: { courses: req.body.courseId } },
            { new: true } 
          );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

export const getCourseDetails = async (req, res)=>{

    try {
        const id = req.params.id;
        const course = await Course.findById(id).populate("owner");
        const levels = await Level.find({course: id});
        course.levels = levels;
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getErolledUsers = async (req, res)=>{
    try {
        const courses = await Course.find().populate("owner");
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getLevel = async (req, res)=>{
    try {
        let id = req.params.id
        const level = await Level.findById(id);
        res.status(200).json(level);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateProgress = async (req, res) => {
    try {
      const { id } = req.user;
      const { courseId, levelId, progress, timeTaken } = req.body;
  
  
      const existingProgress = await Progress.findOne({ userId: id, courseId: courseId });
      const { ObjectId } = Types;
  
      if (existingProgress) {
        const levelIndex = existingProgress.levels.findIndex((level) =>
          level.levelId.equals(new ObjectId(levelId))
        );
      
        if (levelIndex !== -1) {

          const updatedLevels = existingProgress.levels.map((level, index) => {
            if (index === levelIndex) {
              return {
                ...level,
                attempts: level.attempts + 1,
                score: progress,
                passed: true,
                timeTaken,
              };
            }
            return level;
          });
      
          existingProgress.levels = updatedLevels;
        } else {

          existingProgress.levels.push({
            levelId: new ObjectId(levelId),
            attempts: 1,
            score: progress,
            passed: progress > 90 ? true: false,
            timeTaken,
          });
        }
      
        await existingProgress.save();
      } else {
        
        const newProgress = new Progress({
          courseId: courseId,
          userId: id,
          levels: [
            {
              levelId: levelId,
              attempts: 1,
              timeTaken,
              score: progress > 90 ? true: false,
              passed: true,
            },
          ],
        });
  
        await newProgress.save();
      }
  
      res.status(200).json(req.body);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };

  export const getUserProgress = async (req, res) => {
    try {
      const { id } = req.user;
      const { courseId } = req.params;
   
      const userProgress = await Progress.findOne({ userId: id, courseId: courseId });
  
      if (!userProgress) {
        return res.status(404).json({ message: 'User progress not found for the specified course.' });
      }
  
      res.status(200).json(userProgress);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };

  export const getLeaderboard = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      const levelsCount = await Level.find({ course: courseId }).count();
  
      const leaderboardWithUserDetails = await Progress.aggregate([
        {
          $match: {
            $and: [
              { courseId: new mongoose.Types.ObjectId(courseId) },
              { 'levels.passed': true },
              {
                $expr: {
                  $eq: [{ $size: '$levels' }, levelsCount],
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: '$userDetails',
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'courseId',
            foreignField: '_id',
            as: 'courseDetails',
          },
        },
        {
          $unwind: '$courseDetails',
        },
        {
          $addFields: {
            totalAttempts: { $sum: '$levels.attempts' },
            totalTimeTaken: { $sum: '$levels.timeTaken' },
            totalScore: { $sum: '$levels.score' },
          },
        },
        {
          $sort: {
            totalScore: -1,
            totalTimeTaken: 1,
            totalAttempts: 1,
          },
        },
      ]);
  
      res.status(200).json(leaderboardWithUserDetails);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };
  
  export const getEnrolledUsers = async (req, res) => {
    try {
      const { courseId } = req.params;
  

      const enrolledUsers = await User.find({ courses: courseId });
  
      if (!enrolledUsers || enrolledUsers.length === 0) {
        return res.status(404).json({ message: 'No enrolled users found for the specified course.' });
      }
  

  
      res.status(200).json(enrolledUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };