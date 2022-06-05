const express=require('express')
const user_route=express()
const user_controller=require('../controllers/userController')

const authMiddleWare=require('../middlewares/authMiddleWare')

user_route.post('/registerUser',user_controller.registerUser)
user_route.post('/loginUser',user_controller.loginUser)
user_route.get('/logoutUser',authMiddleWare,user_controller.logout)

user_route.post('/updatePassword',authMiddleWare,user_controller.updatePassword)
user_route.post('/updateProfileImage',authMiddleWare,user_controller.updateProfileImage)
user_route.post('/updateLocation',authMiddleWare,user_controller.updateLocation)

user_route.get('/getOTPCode',user_controller.sendOTPCode)
user_route.post('/verifyOTPCode',user_controller.verifyOTPCode)


module.exports=user_route