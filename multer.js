const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'userImages',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

const upload = multer({ storage: storage }).single('userImage');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};