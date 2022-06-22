const express=require('express')
const mosque_route=express()

const mosque_controller=require('../controllers/mosqueController')
const authMiddleWare=require('../middlewares/authMiddleWare')


mosque_route.get('/getAllMosques',mosque_controller.getAllMosques)
mosque_route.post('/getClosestMosques',mosque_controller.getClosestMosques)
mosque_route.post('/getUnverifiedMosquesAroundUser',authMiddleWare,mosque_controller.getUnverifiedMosquesAroundUser)
mosque_route.post('/addMosque',authMiddleWare,mosque_controller.addMosque)

module.exports=mosque_route