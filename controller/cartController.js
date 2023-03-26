const cartModel = require("../model/cartModel")
const jwt = require('jsonwebtoken')
const getAllCartItems = (req,res)=>{
    const token =req.body.token || req.query.token || req.headers["x-access-token"];
    const user = jwt.verify(token,process.env.SECRET_KEY)
    if (user){
        return res.json(cartModel.find(user.id))
    }
    return res.json([])

}

const addToCart = async(req,res)=>{
    const {price, productName, id} = req.body
    let isProductExist = cartModel.find(id)
    console.log(isProductExist)
    // if(isProductExist){
    //     await cartModel.findOneAndUpdate({productName}, {quentity:isProductExist.quentity+1}, {
    //         new: true
    //     });
    //     res.json({
    //         isProductExist
    //     })
    // }else{
        const newProduct = new cartModel({price, productName, id})
        await newProduct.save()
        res.json({
            newProduct
        })
    // }



}
const updateToCart = (req,res)=>{

}
const deleteToCart = (req,res)=>{

}

module.exports = {getAllCartItems, addToCart, updateToCart, deleteToCart}
