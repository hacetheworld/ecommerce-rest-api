const express = require("express")
const {orderPlace,getOrder} = require("../controller/orderController")

const router = express.Router()

router.post("/", orderPlace)
router.get("/", getOrder)

module.exports=router;