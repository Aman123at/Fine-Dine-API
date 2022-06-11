const mongoose = require('mongoose')

const dbConnection = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("database connected."))
    .catch(error=>{
        console.log("Error while connecting to db.")
        console.log(error)
        process.exit(1)
    })
}

module.exports = dbConnection