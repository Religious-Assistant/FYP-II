const express=require('express')
const { getNotifications, deleteNotification } = require('../controllers/notificactionController')
const notification_route=express()

const authMiddleWare=require('../middlewares/authMiddleWare')


notification_route.post('/get-notifications',  authMiddleWare,getNotifications)
notification_route.delete('/delete-notification', authMiddleWare, deleteNotification)


module.exports=notification_route