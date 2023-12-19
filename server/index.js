import express from "express"; 
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js'
import courseRoutes from './routes/course.js'
import filerUploadRoute from './routes/file.js';

/* CONFIGURATION */
dotenv.config()
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDB();

app.use('/auth', authRoutes)
app.use('/course', courseRoutes)
app.use('/file-upload', filerUploadRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});