const express = require("express")

const router = express.Router()
const {signUp, signIn} = require('../controller/userController')
const imageUploader = require('../multer');

router.post('/signup',imageUploader,signUp)

router.post('/signin', signIn)

module.exports=router