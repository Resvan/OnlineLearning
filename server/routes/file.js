import express from "express";
import { uploadCourseFiles } from "../controller/fileController.js";
import upload from "../config/multer.js";




const router = express.Router();

router.post('/', upload.single('file'), uploadCourseFiles);


export default router;