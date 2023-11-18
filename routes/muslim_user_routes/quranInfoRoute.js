const express=require('express')
const { getParahs } = require('../../controllers/muslim_user_controllers/quranInfoController')
const quranInfo_route=express()

quranInfo_route.get('/get-parahs',getParahs)

module.exports=quranInfo_route