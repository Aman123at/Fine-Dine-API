const express = require('express')
const { addCart, getCart } = require('../controllers/cartController')
const { isLoggedIn } = require('../customMiddlewares/user')

const router = express.Router()


router.route('/cart').post(isLoggedIn,addCart).get(isLoggedIn,getCart)


module.exports = router