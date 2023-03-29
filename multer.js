const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define a route for file upload
app.post('/upload', upload.single('file'), function(req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.status = 400;
    return next(error);
  }

  // Upload the file to Cloudinary
  cloudinary.uploader.upload(file.path, function(error, result) {
    if (error) {
      return next(error);
    }

    // Delete the file from the local file system
    fs.unlinkSync(file.path);

    // Do something with the Cloudinary response
    console.log('File uploaded to Cloudinary with public ID:', result.public_id);

    res.send('File uploaded to Cloudinary!');
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
});
