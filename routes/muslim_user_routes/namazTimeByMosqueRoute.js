const express=require('express')
const { updateNamazTimes, getTimesForUser } = require('../../controllers/muslim_user_controllers/namazTimingsController')
const namaz_time_by_mosque_route=express()

const authMiddleWare=require('../../middlewares/authMiddleWare')

namaz_time_by_mosque_route.patch('/update-namaz-times', authMiddleWare,updateNamazTimes)
namaz_time_by_mosque_route.post('/get-times-for-user', authMiddleWare,getTimesForUser)

module.exports=namaz_time_by_mosque_route