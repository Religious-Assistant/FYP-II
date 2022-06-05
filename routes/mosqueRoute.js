const express=require('express')
const mosque_route=express()

const mosque_controller=require('../controllers/mosqueController')
const authMiddleWare=require('../middlewares/authMiddleWare')


mosque_route.post('/addMosque',mosque_controller.addMosque)
mosque_route.get('/getClosestMosques',mosque_controller.getClosestMosques)

module.exports=mosque_route