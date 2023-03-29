const express = require("express")

const router = express.Router()
const {getAllProduct, getProductById } = require('../controller/productController')

router.get('/',getAllProduct)
// router.post('/',createProduct)
router.get('/:id', getProductById)

module.exports=router