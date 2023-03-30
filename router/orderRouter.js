const express = require("express")
const {orderPlace} = require("../controller/orderController")

const router = express.Router()

router.post("/", orderPlace)

module.exports=router;