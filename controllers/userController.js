const User = require('../models/user')



const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')

const crypto = require('crypto')
const tokenWithCookie = require('../utils/tokenWithCookie')
exports.signup = async (req,res,next)=>{
    let resp;
    if(req.files){

        let file = req.files.photo
        resp = await cloudinary.v2.uploader.upload(file.tempFilePath,{
            folder:"users",
            width:150,
            crop:'scale'
        })
    }
    

    const {name,email,password} = req.body

    if(!email || !name || !password){
        res.status(400).json({
            success:false,
            message:"Email , Name and Password is required."
        })
    }

    const user = await User.create(resp ? {
        name,
        email,
        password,
        photo:{
            id:resp.public_id,
            secure_url:resp.secure_url
        }
    }:{
        name,
        email,
        password
    })

   tokenWithCookie(user,res)
}


exports.login = async (req,res,next)=>{
    const {email,password} = req.body

    if(!email || !password){
        res.status(400).json({
            success:false,
            message:"Email and Password required."
        })
    }
    
    const user = await User.findOne({email}).select("+password")
    if(!user){
        res.status(400).json({
            success:false,
            message:"User or password does not exists."
        })
    }
    
    const isCorrectPass = await user.validatePassword(password)
    if(!isCorrectPass){
        res.status(400).json({
            success:false,
            message:"Password is incorrect."
        })
    }
    tokenWithCookie(user,res)
}

exports.logout = async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logout success."
    })
}




// exports.getLoggedInUserDetails = BigPromise(async (req,res,next)=>{
//     const user = await User.findById(req.user.id)

//     res.status(200).json({
//         success:true,
//         user
//     })
// })


// exports.changePassword = BigPromise(async (req,res,next)=>{
//     const userId = req.user.id

//     const user = await User.findById(userId).select("+password")
    
//     const isCorrectOldPassword = await user.isValidatedPassword(req.body.oldPassword)

//     if(!isCorrectOldPassword){
//         return next(new CustomError('old password is incorrect.',400))
//     }

//     user.password = req.body.password

//     await user.save()

//     cookieToken(user,res)
   
// })


// exports.updateUserDetails = BigPromise(async (req,res,next)=>{
//     const userId = req.user.id
//     if(!req.body.name || !req.body.email){
//         return next(new CustomError('Email and name both required.',400))
//     }

//     const newData = {
//         name:req.body.name,
//         email:req.body.email
//     }

//     if(req.files && req.files.photo !== ''){
//         const user = await User.findById(userId)
//         const imageId = user.photo.id
//         // delete photo in cloudinary
//         const resp = await cloudinary.v2.uploader.destroy(imageId)
//         // upload the new photo
//         let file = req.files.photo
//         const result = await cloudinary.v2.uploader.upload(file.tempFilePath,{
//             folder:"users",
//             width:150,
//             crop:'scale'
//         })

//         newData.photo = {
//             id:result.public_id,
//             secure_url:result.secure_url
//         }
//     }
//     const user = await User.findByIdAndUpdate(userId,newData,{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
//     })

//     res.status(200).json({
//         success:true
//     })
    
    
   
// })



// exports.adminAllUsers = BigPromise(async (req,res,next)=>{
//     const user = await User.find({})
//     res.status(200).json({
//         success:true,
//         user
//     })
// })
// exports.admingetOneUser = BigPromise(async (req,res,next)=>{
//     const {id} = req.params
//     const user = await User.findById(id)
//     if(!user){
//         return next(new CustomError('No user found',400))
//     }
//     res.status(200).json({
//         success:true,
//         user
//     })
// })
// exports.adminUpdateOneUserDetails = BigPromise(async (req,res,next)=>{
//     const newData = {
//         name:req.body.name,
//         email:req.body.email,
//         role:req.body.role
//     }

//     const {id} = req.params
//     const user = await User.findByIdAndUpdate(id,newData,{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
//     })
//     if(!user){
//         return next(new CustomError('No user found',400))
//     }
//     res.status(200).json({
//         success:true,
//         user
//     })
// })

// exports.adminDeleteOneUser = BigPromise(async (req,res,next)=>{
//     const {id} = req.params
//     const user = await User.findById(id)
//     if(!user){
//         return next(new CustomError('No user found',401))
//     }
//     const imageId = user.photo.id
//     await cloudinary.v2.uploader.destroy(imageId)
//     await user.remove()
//     res.status(200).json({
//         success:true,
//         message:"User deleted successfully."
//     })
// })



// exports.managerAllUsers = BigPromise(async (req,res,next)=>{
//     const user = await User.find({role:'user'})
//     res.status(200).json({
//         success:true,
//         user
//     })
// })