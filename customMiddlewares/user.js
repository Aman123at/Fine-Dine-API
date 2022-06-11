const User = require("../models/user")


const jwt = require("jsonwebtoken")




exports.isLoggedIn =async (req,res,next)=>{
   
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        res.status(400).json({
            success:false,
            message:"Please login to use this page."
        })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decode.id)

    next()
}

exports.isManager = (req,res,next)=>{
    
        if(req.user.role !== "manager"){
            res.status(400).json({
                success:false,
                message:"You are not allowed to access this resource."
            })
        }
        next()
    
}