const contactModel = require('../model/contactModel')
const contactForSubmit = async(req,res)=>{
    const {name,email,message}=req.body
    if (name==="" || email==="" || message===""){
        return res.status(400).json({message:"Please fill the form "})
    }
    const newUser = new contactModel(req.body)
    await newUser.save()
    return res.json({newUser})
}

module.exports = {contactForSubmit}