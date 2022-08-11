const express=require('express')
const mosque_route=express()

const mosque_controller=require('../../controllers/muslim_user_controllers/mosqueController')
const authMiddleWare=require('../../middlewares/authMiddleWare')


mosque_route.get('/get-all-mosques',mosque_controller.getAllMosques)
mosque_route.post('/get-closest-mosques',mosque_controller.getClosestMosques)
mosque_route.post('/get-unverified-mosques-aroundUser',authMiddleWare,mosque_controller.getUnverifiedMosquesAroundUser)
mosque_route.post('/add-mosque',authMiddleWare,mosque_controller.addMosque)
mosque_route.post('/get-mosque-by-id',authMiddleWare,mosque_controller.getMosqueById)

module.exports=mosque_route