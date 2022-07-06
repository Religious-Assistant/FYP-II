const express=require('express')
const { getRecitationStats, updateLastReadSurah, updateLastReadParah, markSurahAsRead, markParahAsRead, markSurahAsUnRead, markParahAsUnRead, checkSurahIsRead } = require('../controllers/reciteQuranController')
const recite_quran_route=express()

const authMiddleWare=require('../middlewares/authMiddleWare')

recite_quran_route.get('/get-recitation-stats',authMiddleWare,getRecitationStats)
recite_quran_route.patch('/mark-surah-as-read',authMiddleWare,markSurahAsRead)
recite_quran_route.get('/check-surah-is-read',authMiddleWare,checkSurahIsRead)

recite_quran_route.patch('/mark-surah-as-unread',authMiddleWare,markSurahAsUnRead)
recite_quran_route.patch('/mark-parah-as-read',authMiddleWare,markParahAsRead)
recite_quran_route.patch('/mark-parah-as-unread',authMiddleWare,markParahAsUnRead)

recite_quran_route.patch('/update-last-read-surah',authMiddleWare,updateLastReadSurah)
recite_quran_route.patch('/update-last-read-parah',authMiddleWare,updateLastReadParah)

module.exports=recite_quran_route