const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
const bcrypt = require("bcryptjs")

const signUp = async(req,res)=>{
    // extract data from request body
    // const name = req.body.name;
    // const image = req.file;
    const {name, email, password} = req.body
  // console.log(name,email,"ueserimag")
    try{

        const user = await userModel.findOne({email});
      if (user) {
        return res.status(200).json({
          message: "Failed! Email is already in use!"
        });
      }else{

        const url=req.file.path
        const newUser = new userModel({name,email,password,userImage:url})
        await newUser.save()
        const id = newUser._id
        const token = jwt.sign({email,id}, process.env.SECRET_KEY)
        return res.status(200).json({
            message: "user registered successfully !!",
            newUser,
            token
        });
      }

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  };


const signIn = async(req,res)=>{
    // extract data from request body
    const { email, password } = req.body
    // console.log(email,password,"sfsf")
    // Email
    try{
        const user = await userModel.findOne({
          email: email
        });

      if (!user) {
        return res.status(200).json({
          message: "User does not exist"
        });

      }else{
        const hash = user.password

        bcrypt.compare(password, hash, function(error, isMatch) {
          console.log({email,password,isMatch},"in password match")
          if (error) {
            throw error
          } else if (!isMatch) {
            return res.status(200).json({
              message: "password does not matched!"
            });
          } else {
            const id = user._id
            const token = jwt.sign({email,id}, process.env.SECRET_KEY)
            return res.status(200).json({
                message: "user logged in successfully !!",
                token,
                newUser:user
            });
          }
        })
        // if (user.password !== password){
        //     return res.status(200).json({
        //         message: "password does not matched!"
        //       });
        // }
        // const id = user._id
        // const token = jwt.sign({email,id}, process.env.SECRET_KEY)
        // return res.status(200).json({
        //     message: "user logged in successfully !!",
        //     token,
        //     newUser:user
        // });
      }

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }

}

module.exports = {signUp, signIn}