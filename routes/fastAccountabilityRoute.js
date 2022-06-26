const express=require('express')
const { updateFastAccuntability, getFastAccuntability } = require('../controllers/fastAccountabilityController')
const fast_accountability_route=express()
const authMiddleWare=require('../middlewares/authMiddleWare')

fast_accountability_route.post('/update-fast-accountability', authMiddleWare,updateFastAccuntability)
fast_accountability_route.get('/get-fast-accountability', authMiddleWare,getFastAccuntability)

module.exports=fast_accountability_route