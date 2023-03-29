const cartModel = require("../model/cartModel")
const jwt = require('jsonwebtoken')
const {getUser} =require('../utils')
const getAllCartItems = (req,res)=>{
    const user=getUser(req).id
    if (user){
        return res.json(cartModel.find({user:user.id}).cart)
    }
    return res.status(200).json({message:"Cart is empty"})
}

const addToCart = async(req,res)=>{
    const {productId,cartQuantity} = req.body

    const userId=getUser(req).id
    try{
    let userCart = await cartModel.findOne({ user: userId });
    if (!userCart){
        userCart = new cartModel({user:userId})
    }
    const productIndex = userCart.cart.findIndex(
    (item) => item.product.toString() === productId);
    if (productIndex!==-1){
    userCart.cart[productIndex].quantity += parseInt(cartQuantity);
    if (userCart.cart[productIndex].quantity==0){
        let st=productIndex
        let e=productIndex
        if (productIndex==0){
            e+=1
        }
        userCart.cart.splice(st,e)
        }
    }
    else{
        const newProduct = {product:productId}
        userCart.cart.push(newProduct)
    }

            await userCart.save()
            return res.json(userCart)
        }catch(err){
            return res.status(500).json({message:err.message})
        }

}

const deleteToCart = async(req,res)=>{
    const {productId} = req.body

    const userId=getUser(req).id
    try{
    let userCart = await cartModel.findOne({ user: userId });
    const productIndex = userCart.cart.findIndex(
    (item) => item.product.toString() === productId);

    let st=productIndex
    let e=productIndex
    if (productIndex==0){
        e+=1
    }
    userCart.cart.splice(st,e)
    await userCart.save()
    return res.json(userCart)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}

module.exports = {getAllCartItems, addToCart, deleteToCart}
