const express=require('express')
const { makeAnnouncement, getAllAnnouncements, deleteAnnouncement, deleteAllAnnouncements } = require('../../controllers/muslim_user_controllers/muslimUserAnnouncementController')
const authMiddleWare=require('../../middlewares/authMiddleWare')

const announcementRoute=express()

announcementRoute.post('/make-announcement',authMiddleWare, makeAnnouncement)
announcementRoute.delete('/delete-announcement',authMiddleWare, deleteAnnouncement)
announcementRoute.post('/get-all-announcements',authMiddleWare, getAllAnnouncements)
announcementRoute.delete('/delete-all-announcements', deleteAllAnnouncements)

module.exports=announcementRoute
