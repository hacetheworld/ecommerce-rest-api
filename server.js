require("dotenv").config()
require('./db')
require("./config")
const express = require("express")
const multer = require('multer');
const app=express()

const bodyParser = require('body-parser');

// Basic middleware Setup
// Add headers in order to perform all operation on API
// Because CORS Thing (Google it if you do not know)
const CorsPermission = require("./middleware/corsPermission")
app.use(CorsPermission);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer For images and videos from form
const upload = multer({ dest: 'uploads/' });

// Routers
const userRouter = require("./router/userRouter")
const cartRouter = require("./router/cartRouter")

// AUTHENTICATION AND AUTHORIZATION Routing
app.use("/api/v1/",userRouter)

// Cart Routing
app.use("/api/v1/cart",cartRouter)

// Satrt app
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})