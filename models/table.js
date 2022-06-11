const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
    tableNo:{
        type:Number,
        required:[true,"Table number is required."]
    },
    // totalTable:{
    //     type:Number,
    //     required:[true,"Table count is required."]
    // },
    // occupiedTable:{
    //     type:Number,
    //     required:[true,"Occupied Count is required."]
    // },
    // freeTable:{
    //     type:Number,
    //     required:[true,"Free Count is required."]
    // },
    status:{
        type:String,
        default:'free',
        enum:{
            values:['occupied','free'],
            message:'Please select occupied or free'
        }
    },
    
})


module.exports = mongoose.model('Table',tableSchema)