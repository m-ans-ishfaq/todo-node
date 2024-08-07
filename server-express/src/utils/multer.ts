import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { RemoteStorage } from 'multer-remote-storage';
import { config } from 'dotenv';
config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const diskImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const cloudinaryImageStorage = new RemoteStorage({
    client: cloudinary,
    params: {
        folder: 'images'
    }
});
export const imgUpload = multer({ storage: process.env.FILE_UPLOAD === "CLOUD" ? cloudinaryImageStorage : diskImageStorage });
