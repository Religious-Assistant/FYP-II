const express=require('express')
const { makeAnnouncement, getAllAnnouncements, deleteAnnouncement } = require('../controllers/announcementController')
const authMiddleWare=require('../middlewares/authMiddleWare')

const announcementRoute=express()

announcementRoute.post('/make-announcement',authMiddleWare, makeAnnouncement)
announcementRoute.delete('/delete-announcement',authMiddleWare, deleteAnnouncement)
announcementRoute.get('/get-all-announcements',authMiddleWare, getAllAnnouncements)

module.exports=announcementRoute
