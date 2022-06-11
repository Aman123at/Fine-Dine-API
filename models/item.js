const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Item name is required."]
    },
    price:{
        type:Number,
        required:[true,"Price is required."]
    },
    category:{
        type:String,
        required:[true,"Category is required."]
    },
    images:[{
        id:{
            type:String,
            required:true
            
        },
        secure_url:{
            type:String,
            required:true
            
        }
    }],
})


module.exports = mongoose.model('Item',itemSchema)