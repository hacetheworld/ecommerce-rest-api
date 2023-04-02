const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    products:[
        {
            product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
            },
            quantity:{type:Number},
            price:{type:Number},
        }
    ],
    total:{type:Number},
    shippingAddress:{type:String}

})

module.exports = mongoose.model("order", orderSchema)