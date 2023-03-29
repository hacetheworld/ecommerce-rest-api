require("dotenv").config()
require('./db')
require("./config")
const express = require("express")
const multer = require('multer');
const app=express()
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;


// Basic middleware Setup
// Add headers in order to perform all operation on API
// Because CORS Thing (Google it if you do not know)
const CorsPermission = require("./middleware/corsPermission")
app.use(CorsPermission);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Cloudinary
// Configure Multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });


// Routers
const userRouter = require("./router/userRouter")
const cartRouter = require("./router/cartRouter")
const productRouter = require("./router/productRouter")
const contactRouter = require("./router/contactRouter")

// AUTHENTICATION AND AUTHORIZATION Routing
app.use("/api/v1/",upload.single('userImage'),userRouter)

// Cart Routing
app.use("/api/v1/cart",cartRouter)

// Product Routing
app.use("/api/v1/product",productRouter)

// Contact Routing
app.use("/api/v1/contactus",contactRouter)
// Satrt app
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})