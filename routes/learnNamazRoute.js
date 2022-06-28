const express=require('express')
const { getProgress, updateProgress } = require('../controllers/learnNamazController')
const learn_namaz_route=express()

const authMiddleWare=require('../middlewares/authMiddleWare')


learn_namaz_route.get('/get-learn-namaz-progress',authMiddleWare,getProgress)
learn_namaz_route.post('/update-learn-namaz-progress',authMiddleWare,updateProgress)


module.exports=learn_namaz_route