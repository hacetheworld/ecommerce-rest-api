const express = require("express")

const router = express.Router()
const {getAllCartItems, addToCart,deleteToCart} = require('../controller/cartController')

router.get('/',getAllCartItems)
router.post('/',addToCart)
router.delete('/',deleteToCart)

module.exports=router