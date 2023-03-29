const jwt =require("jsonwebtoken")

const getUser=(req)=>{
    const token =req.body.token || req.query.token || req.headers["x-access-token"];
    const user = jwt.verify(token,process.env.SECRET_KEY)
    return user
}

module.exports={getUser}