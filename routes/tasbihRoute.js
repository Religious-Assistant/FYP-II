const express=require('express')
const tasbih_route=express()
const tasbihController=require('../controllers/tasbihController')

const authMiddleWare=require('../middlewares/authMiddleWare')

tasbih_route.patch('/update-tasbih',authMiddleWare,tasbihController.updateTasbih)

module.exports=tasbih_route