const ProductModel = require('../model/productModel')

 const createProduct = (async(req, res)=> {
    // const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body
    const data=req.body
    // console.log(data,"data")
    // return
    try{
        for (product of data){
            const newProduct = new ProductModel(product)
            await newProduct.save()
        }
        res.status(200).json({
            message: "Product saved succefully",
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

 const getAllProduct = (async(req, res)=> {
    const allProduct = await ProductModel.find({})
    console.log(allProduct,"allproduct")
    res.status(200).json(allProduct)
})

 const getProductById = (async(req, res)=> {
    try{
        const id = req.params.id
        const Product = await ProductModel.find({_id:id})
        console.log(Product,"Product")
        if(Product){
            res.status(200).json(
                Product
            )
        }else{
            res.status(400).json(
                {message: "product not found !!"}
            )
        }

    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports={createProduct,getAllProduct,getProductById}