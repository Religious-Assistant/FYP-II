const express=require('express')
const { getProgress, updateProgress } = require('../controllers/learnNamazController')
const learn_namaz_route=express()

const authMiddleWare=require('../middlewares/authMiddleWare')


learn_namaz_route.get('/get-progress',getProgress)
learn_namaz_route.post('/update-progress',updateProgress)


module.exports=learn_namaz_route