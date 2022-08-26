const express=require('express')
const { updateNamazAlarmsTimes, getNamazAlarmsTimesForUser } = require('../../controllers/muslim_user_controllers/namazAlarmsController')
const namaz_alarms_route=express()

const authMiddleWare=require('../../middlewares/authMiddleWare')

namaz_alarms_route.patch('/update-namaz-alarm-times', authMiddleWare,updateNamazAlarmsTimes)
namaz_alarms_route.post('/get-namaz-alarms-for-user', authMiddleWare,getNamazAlarmsTimesForUser)

module.exports=namaz_alarms_route