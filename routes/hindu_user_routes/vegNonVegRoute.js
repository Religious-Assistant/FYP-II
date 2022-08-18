const express=require('express')
const { setVegDays, getVegDays } = require('../../controllers/hindu_user_controllers/vegNonVegController')
const authMiddleWare=require('../../middlewares/authMiddleWare')

const veg_non_veg_route=express()


veg_non_veg_route.patch('/set-veg-days',authMiddleWare,setVegDays)
veg_non_veg_route.post('/get-veg-days',authMiddleWare,getVegDays)



module.exports=veg_non_veg_route