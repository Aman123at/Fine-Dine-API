const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    table:{
       
            type:mongoose.Schema.ObjectId,
            ref:"Table",
            required:true
  
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    items:{
        type:mongoose.Schema.ObjectId,
        ref:"Item",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        
    }
  
})


module.exports = mongoose.model('Order',orderSchema)