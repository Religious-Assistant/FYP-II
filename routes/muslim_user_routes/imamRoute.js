const express=require('express')
const { becomeImam } = require('../../controllers/muslim_user_controllers/imamController')
const imam_route=express()

const authMiddleWare=require('../../middlewares/authMiddleWare')

imam_route.post('/become-imam',authMiddleWare,authMiddleWare,becomeImam)

module.exports=imam_route