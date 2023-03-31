const orderModel = require("../model/orderModel")
const cartModel = require("../model/cartModel")
const transporter =require('../mailSent')
const {getUser} =require('../utils')
const orderPlace = async(req, res) => {
    const userId=getUser(req).id
    const to=getUser(req).email

    const userCarts = await cartModel.findOne({user:userId}).populate({
        path: 'cart.product',
      });
    // console.log(userCarts.cart[0].product,"userCarts")
    // return res.json({message:"dsdfnjskf"})
    try{
        if (userCarts){
            let total=0
            // console.log(userCarts.populate('product'))
            const carts = userCarts.cart.map((productItem)=>{
                total+=(productItem.product.price*productItem.quantity)
                return productItem
            })
            userCarts.cart=[]
            // console.log(total,"sdf")
            const userOrder = new orderModel({user:userId,total})
            carts.forEach(product => {
                userOrder.products.push(product)
            });
            await userOrder.save()
            await userCarts.save()
            // sendEmail(to, "confirming order", "thanks for the order")
            const mailOptions = {
                from: 'majay1638@gmail.com',
                to: to,
                subject: 'Order Confirmation',
                text: `Thank you for your order! Your order total is $ ${total}.`
              };
            await transporter.sendMail(mailOptions);
            return res.json({message:"order placed"})
        }
        return res.json({message:"Cart is empty please add to cart first"})

    }catch(err){
        return res.status(500).json({message:err.message})
    }

}

module.exports = {orderPlace}