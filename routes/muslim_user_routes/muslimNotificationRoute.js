const express=require('express')
const { getUserNotifications, deleteMuslimNotification } = require('../../controllers/muslim_user_controllers/muslimNotificactionController')
const authMiddleWare=require('../../middlewares/authMiddleWare')

const muslim_notification_route=express()


muslim_notification_route.post('/get-user-notifications',  authMiddleWare,getUserNotifications)
muslim_notification_route.delete('/delete-muslim-notification', authMiddleWare, deleteMuslimNotification)


module.exports=muslim_notification_route