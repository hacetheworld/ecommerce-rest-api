const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

      },

    productName:{type:String},
    productQuantity:{type:Number,default:1},
    productImage:{type:String},
    productPrice:{type:Number},
})
module.exports = mongoose.model('Cart', cartSchema)