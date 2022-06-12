const User = require('../models/user')



const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')

const crypto = require('crypto')
const tokenWithCookie = require('../utils/tokenWithCookie')
const Table = require('../models/table')
const { isLoggedIn } = require('../customMiddlewares/user')
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
    const {email,password,tableNo} = req.body
    

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
    }else{

        if(user.role != 'manager'){
            let table = await Table.findOne({tableNo:parseInt(tableNo)})
            
            if(table){
                user.tableNo = table.tableNo
                User.findByIdAndUpdate(user._id,{tableNo:table.tableNo})
                .then((r)=>console.log(r))
                .catch((err)=>{
                    res.status(400).json({
                        success:false,
                        message:err
                    })
                })
                Table.findByIdAndUpdate(table._id,{status:'occupied'})
                .then()
                .catch((err)=>{
                    res.status(400).json({
                        success:false,
                        message:err
                    })
                })
            }
        }
        
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
   
    let loggedInUser = req.user
    Table.findOneAndUpdate({tableNo:loggedInUser.tableNo},{status:'free'}, {
        new: true
      })
                .then()
                .catch((err)=>{
                    res.status(400).json({
                        success:false,
                        message:err
                    })
                })
    
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logout success."
    })
}




