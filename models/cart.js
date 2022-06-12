const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:[true,"Item name is required."]
    },
    quantity:{
        type:Number,
        required:[true,"Quantity is required."]
    },
    totalPrice:{
        type:Number,
        required:[true,"Total Price is required."]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    
  
})


module.exports = mongoose.model('Cart',cartSchema)