const express = require('express')
const { signup, login, logout } = require('../controllers/userController')
const router = express.Router()

// Authentication related routes
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)






module.exports = router