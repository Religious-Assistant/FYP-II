const express=require('express')
const { updateNamazAccuntability, getNamazAccuntability } = require('../../controllers/muslim_user_controllers/namazAccountabilityController')
const namaz_accountability_route=express()
const authMiddleWare=require('../../middlewares/authMiddleWare')

namaz_accountability_route.post('/update-namaz-accountability', authMiddleWare,updateNamazAccuntability)
namaz_accountability_route.get('/get-namaz-accountability', authMiddleWare,getNamazAccuntability)

module.exports=namaz_accountability_route