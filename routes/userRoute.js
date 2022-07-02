const express=require('express')
const { registerUser, loginUser, forgotPassword, updateProfileImage, sendOTPCode, verifyOTPCode, updatePassword } = require('../controllers/userController')

const user_route=express()
const authMiddleWare=require('../middlewares/authMiddleWare')

user_route.post('/register-user',registerUser)
user_route.post('/login-user',loginUser)
user_route.patch('/update-password',authMiddleWare,updatePassword)
user_route.patch('/forgot-password',forgotPassword)
user_route.post('/update-profile-image',authMiddleWare,updateProfileImage)
user_route.get('/get-OTP-code',sendOTPCode)
user_route.post('/verify-otp-code',verifyOTPCode)


module.exports=user_route