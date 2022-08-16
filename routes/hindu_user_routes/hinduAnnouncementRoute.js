const express=require('express')
const { makeAnnouncement, deleteAnnouncement, getAllAnnouncements, deleteAllAnnouncements } = require('../../controllers/hindu_user_controllers/hinduUserAnnouncementController')
const authMiddleWare=require('../../middlewares/authMiddleWare')

const hindu_announcement_route=express()

hindu_announcement_route.post('/make-announcement',authMiddleWare, makeAnnouncement)
hindu_announcement_route.delete('/delete-announcement',authMiddleWare, deleteAnnouncement)
hindu_announcement_route.post('/get-all-announcements',authMiddleWare, getAllAnnouncements)
hindu_announcement_route.delete('/delete-all-announcements', deleteAllAnnouncements)

module.exports=hindu_announcement_route
