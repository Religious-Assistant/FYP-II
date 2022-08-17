const express=require('express')
const { makeAnnouncement, deleteAnnouncement, getAllAnnouncements, deleteAllAnnouncements } = require('../../controllers/hindu_user_controllers/hinduUserAnnouncementController')
const authMiddleWare=require('../../middlewares/authMiddleWare')

const hindu_announcement_route=express()

hindu_announcement_route.post('/make-announcement-for-hindu-users',authMiddleWare, makeAnnouncement)
hindu_announcement_route.delete('/delete-announcement-for-hindu-users',authMiddleWare, deleteAnnouncement)
hindu_announcement_route.post('/get-all-announcements-for-hindu-users',authMiddleWare, getAllAnnouncements)
hindu_announcement_route.delete('/delete-all-announcements-for-hindu-users', deleteAllAnnouncements)

module.exports=hindu_announcement_route
