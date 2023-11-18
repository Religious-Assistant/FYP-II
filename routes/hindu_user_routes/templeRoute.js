const express=require('express')
const { getAllTemples, getClosestTemples, getUnverifiedTemplesAroundUser, addTemple, getTempleById, castUpvote, castDownvote } = require('../../controllers/hindu_user_controllers/templeController')
const temple_route=express()
const authMiddleWare=require('../../middlewares/authMiddleWare')

temple_route.get('/get-all-temples',getAllTemples)
temple_route.post('/get-closest-temples',authMiddleWare,getClosestTemples)
temple_route.post('/get-unverified-temples-aroundUser',authMiddleWare,getUnverifiedTemplesAroundUser)
temple_route.post('/add-temple',authMiddleWare,addTemple)
temple_route.post('/get-temple-by-id',authMiddleWare,getTempleById)
temple_route.patch('/cast-up-vote-for-temple',authMiddleWare,castUpvote)
temple_route.patch('/cast-down-vote-for-temple',authMiddleWare,castDownvote)

module.exports=temple_route