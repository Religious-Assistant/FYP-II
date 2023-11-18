const express=require('express')
const { getProgress, updateProgress, getParticularRakatInfo } = require('../../controllers/muslim_user_controllers/learnNamazController')
const learn_namaz_route=express()

const authMiddleWare=require('../../middlewares/authMiddleWare')


learn_namaz_route.post('/get-learn-namaz-progress',authMiddleWare,getProgress)
learn_namaz_route.patch('/update-learn-namaz-progress',authMiddleWare,updateProgress)
learn_namaz_route.post('/get-particular-rakat-info',authMiddleWare,getParticularRakatInfo)


module.exports=learn_namaz_route