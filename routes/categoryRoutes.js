const express = require('express')
const { addCategory, getCategories } = require('../controllers/categoryController')
const { isLoggedIn, isManager } = require('../customMiddlewares/user')

const router = express.Router()


router.route('/category').post(isLoggedIn,isManager,addCategory).get(isLoggedIn,getCategories)


module.exports = router