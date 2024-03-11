import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const docStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['raw', 'jpg', 'png', 'pdf', 'zip', 'rar', 'ppt', 'pptx'],
  params: {
    folder: 'uetable/Document'
  }
});

const docUpload = multer({ storage: docStorage });


const avatarStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['raw', 'jpg', 'png', 'pdf', 'zip', 'rar', 'ppt', 'pptx'],
  params: {
    folder: 'uetable/Avatar'
  }
});

const avatarUpload = multer({ storage: avatarStorage });

export {docUpload, avatarUpload};