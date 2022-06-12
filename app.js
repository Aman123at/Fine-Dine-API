const express = require("express")
require('dotenv').config()
const morgan = require('morgan')
const app = express()
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
app.use(cors({
    origin: '*'
}))





// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))


app.use(morgan("tiny"))


// import all routes here
// const home = require('./routes/Home')
const user = require('./routes/userRoutes')
const item = require('./routes/itemRoutes')
const category = require('./routes/categoryRoutes')
const table = require('./routes/tableRoutes')
const cart = require('./routes/cartRoutes')
// const payment = require('./routes/payment')
// const order = require('./routes/order')

// // router middleware
// app.use('/api/v1',home)
app.use('/api/v1',user)
app.use('/api/v1',item)
app.use('/api/v1',category)
app.use('/api/v1',table)
app.use('/api/v1',cart)
// app.use('/api/v1',order)


// export app js
module.exports = app