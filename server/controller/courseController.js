import cloudinary from "../config/cloudinery.js";
import Course from "../models/Course.js";
import Level from "../models/Level.js";
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

        console.log(levels);

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
        console.log(id);
        const level = await Level.findById(id);
        res.status(200).json(level);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const updateProgress = async (req, res)=>{
    try {
        const {id} = req.user;
      const user = await User.findById(id);
     let  progress = [];
      progress.push({
        courseId: req.body.courseId,
        levels: {
            levelId: req.body.levelId,
            attempts: 1,
            timeTaken: 5,
            score: req.body.progress,
            passed: true
        }
      });

      user.progress = progress;
     let user1 = await user.save();
     console.log(user1);
        res.status(200).json(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}