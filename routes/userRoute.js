const express=require('express')
const user_route=express()
const user_controller=require('../controllers/userController')

const authMiddleWare=require('../middlewares/authMiddleWare')

user_route.post('/registerUser',user_controller.registerUser)
user_route.post('/loginUser',user_controller.loginUser)
user_route.post('/updatePassword',authMiddleWare,user_controller.updatePassword)
user_route.post('/updateProfileImage',authMiddleWare,user_controller.updateProfileImage)

// user_route.get('/authenticatedAPI',authMiddleWare, (req,res)=>{

//     res.status(200).send({success:true, msg:"Authenticated User"});
// })

module.exports=user_route