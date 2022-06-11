const express=require('express')
const { addTable, getAllTables } = require('../controllers/tableController')
const { isLoggedIn, isManager } = require('../customMiddlewares/user')
const router = express.Router()


router.route('/table').post(isLoggedIn,isManager,addTable).get(isLoggedIn,getAllTables)


module.exports = router