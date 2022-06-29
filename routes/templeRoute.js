const express=require('express')
const { getAllTemples, getClosestTemples, getUnverifiedTemplesAroundUser, addTemple } = require('../controllers/templeController')
const temple_route=express()

const authMiddleWare=require('../middlewares/authMiddleWare')


temple_route.get('/get-all-temples',getAllTemples)
temple_route.post('/get-closest-temples',getClosestTemples)
temple_route.post('/get-unverified-temples-around-user',authMiddleWare,getUnverifiedTemplesAroundUser)
temple_route.post('/add-temple',authMiddleWare,addTemple)

module.exports=temple_route