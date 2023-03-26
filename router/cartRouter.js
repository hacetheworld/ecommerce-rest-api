const express = require("express")

const router = express.Router()
const {getAllCartItems, addToCart,deleteToCart,updateToCart} = require('../controller/cartController')

router.get('/',getAllCartItems)
router.post('/',addToCart)
router.delete('/',deleteToCart)
router.put('/',updateToCart)

module.exports=router