const express=require('express')
const muslim_pref_route=express()
const pref_controller=require('../controllers/muslimeUserPrefController')

const authMiddleWare=require('../middlewares/authMiddleWare')

//apply middleware tp check religion

muslim_pref_route.post('/updatePrimaryMosque',authMiddleWare,pref_controller.updatePrimaryMosque)
muslim_pref_route.post('/updateAutoSilentSettings',authMiddleWare,pref_controller.updateAutoSilentSettings)

module.exports=muslim_pref_route