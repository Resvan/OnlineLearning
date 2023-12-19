import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../config/multer.js";
import { addLevels, addCourse, getAllCourse, enrollCourse, getCourseDetails, getLevel, updateProgress } from "../controller/courseController.js";




const router = express.Router();

router.get('/',verifyToken, getAllCourse);
router.post('/add',verifyToken, upload.single('image'), addCourse);
router.post('/level', verifyToken, upload.single('image'), addLevels);
router.post('/enroll', verifyToken, enrollCourse );
router.get('/course-details/:id', verifyToken, getCourseDetails);
router.get('/level-details/:id', verifyToken, getLevel);
router.post('/update-progress', verifyToken, updateProgress);



export default router;