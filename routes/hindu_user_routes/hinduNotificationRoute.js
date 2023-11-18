const express=require('express')
const { getUserNotifications, deleteHinduNotification } = require('../../controllers/hindu_user_controllers/hinduNotificactionController')
const authMiddleWare=require('../../middlewares/authMiddleWare')

const hindu_notification_route=express()


hindu_notification_route.post('/get-hindu-user-notifications',  authMiddleWare,getUserNotifications)
hindu_notification_route.delete('/delete-hindu-notification', authMiddleWare, deleteHinduNotification)


module.exports=hindu_notification_route