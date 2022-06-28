const express=require('express')
const muslim_pref_route=express()
const pref_controller=require('../controllers/muslimeUserPrefController')

const authMiddleWare=require('../middlewares/authMiddleWare')

//apply middleware tp check religion

muslim_pref_route.post('/update-primary-mosque',authMiddleWare,pref_controller.updatePrimaryMosque)
muslim_pref_route.post('/update-auto-silent-settings',authMiddleWare,pref_controller.updateAutoSilentSettings)

module.exports=muslim_pref_route