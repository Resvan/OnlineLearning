import cloudinary from "../config/cloudinery.js";



export const uploadCourseFiles = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        const {fileType} = req.body
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: fileType, folder: "Online_learning"
        });

        res.status(200).json({file:result.secure_url});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};