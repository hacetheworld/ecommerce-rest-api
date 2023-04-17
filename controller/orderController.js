const orderModel = require("../model/orderModel")
const productModel = require("../model/productModel")
const {getUser} =require('../utils')

const getOrder = async(req,res)=>{
  const userId=getUser(req).id
    try{
        const order = await orderModel.find({user:userId}).populate('orderItems.product');
        return res.json(order)

    }catch(err){
      return res.json({message:err.messsage})
    }

}
const orderPlace = async(req, res) => {
    const userId=getUser(req).id
    try {
        // Extract data from request body
        const { orderItems,totalPrice,shippingAddress } = req.body;
        // Create new order object
        // console.log(orderItems,"orderItems")
        const order = new orderModel({
          user: userId,
          orderItems: orderItems.map(item => ({
            product: item.productId,
            quantity: item.quantity
          })),
          totalPrice,
          shippingAddress
        });

        // Save order to database
        await order.save();
        // Update product quantities
        // for (const item of orderItems) {
        //   const product = await productModel.findById(item.productId);
        //   product.quantity -= item.quantity;
        //   await product.save();
        // }
        // Send success response
        // console.log("heelo")
        res.status(201).json({ message: 'Order created successfully', order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create order',errorMessage:error.message });
      }

}

module.exports = {orderPlace,getOrder}