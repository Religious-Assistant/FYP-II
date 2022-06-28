const express=require('express')
const { saveLastRead, getRecitationStats, saveRecitationProgress } = require('../controllers/reciteQuranController')
const recite_quran_route=express()

const authMiddleWare=require('../middlewares/authMiddleWare')

recite_quran_route.get('/get-recitation-stats',authMiddleWare,getRecitationStats)
recite_quran_route.post('/save-recitation-progress',authMiddleWare,saveRecitationProgress)
recite_quran_route.post('/save-last-read',authMiddleWare,saveLastRead)

module.exports=recite_quran_route