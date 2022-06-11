const express = require('express')
const { addItem, getItems, getOneItem } = require('../controllers/itemController')
const { isLoggedIn, isManager } = require('../customMiddlewares/user')
const router = express.Router()

// Item related routes
router.route('/item').post(isLoggedIn,isManager,addItem).get(isLoggedIn,getItems)
router.route('/item/:id').get(isLoggedIn,getOneItem)
// router.route('/login').post(login)
// router.route('/logout').post(logout)






module.exports = router