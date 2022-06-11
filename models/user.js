const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[30,"Name should be under 30 characters"]
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        validate:[validator.isEmail,'Please enter email in correct format'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:[6,'Password should be atleast 6 characters'],
        select:false
    },
    role:{
        type:String,
        default:'user',
        required:true
    },
    table:{
        type:mongoose.Schema.ObjectId,
        ref:'Table'
    },
    photo:{
        id:{
            type:String,
            
            
        },
        secure_url:{
            type:String,
            
            
        }
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    }
})

// encrypting password before saving to database
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    console.log("LatestPass",this.password)
    this.password = await bcrypt.hash(this.password,10)
})


userSchema.methods.validatePassword = async function(pass){
    return await bcrypt.compare(pass,this.password)
}




userSchema.methods.getjwt = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}









module.exports = mongoose.model('User',userSchema)