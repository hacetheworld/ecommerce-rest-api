const jwt =require("jsonwebtoken")
const Datauri =require('datauri');
const path = require('path');
const getUser=(req)=>{
    const token =req.body.token || req.query.token || req.headers["x-access-token"];
    const user = jwt.verify(token,process.env.SECRET_KEY)
    return user
}

const getDataUri = (req) => {
    const dUri = new Datauri();
    console.log("datauri")
    return  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
};


module.exports={getUser,getDataUri}