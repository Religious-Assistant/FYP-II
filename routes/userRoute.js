const express=require('express')
const user_route=express()
const user_controller=require('../controllers/userController')

const authMiddleWare=require('../middlewares/authMiddleWare')

user_route.post('/register-user',user_controller.registerUser)
user_route.post('/login-user',user_controller.loginUser)
user_route.get('/logout-user',authMiddleWare,user_controller.logout)

user_route.post('/update-password',authMiddleWare,user_controller.updatePassword)
user_route.post('/update-profile-image',authMiddleWare,user_controller.updateProfileImage)
user_route.post('/update-location',authMiddleWare,user_controller.updateLocation)

user_route.get('/get-OTP-code',user_controller.sendOTPCode)
user_route.post('/verify-otp-code',user_controller.verifyOTPCode)


module.exports=user_route