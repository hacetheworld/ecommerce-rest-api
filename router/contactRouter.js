const express = require("express")

const router = express.Router()

const {contactForSubmit} = require('../controller/contactController')


router.post('/',contactForSubmit)

module.exports=router
