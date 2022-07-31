const express=require('express')
const muslim_pref_route=express()
const pref_controller=require('../../controllers/muslim_user_controllers/muslimeUserPrefController')

const authMiddleWare=require('../../middlewares/authMiddleWare')

//apply middleware tp check religion

muslim_pref_route.patch('/update-primary-mosque',authMiddleWare,pref_controller.updatePrimaryMosque)
muslim_pref_route.patch('/update-auto-silent-setting',authMiddleWare,pref_controller.updateAutoSilentSettings)
muslim_pref_route.patch('/update-namaz-notifications-setting',authMiddleWare,pref_controller.updateNamazNotificationsSetting)
muslim_pref_route.patch('/update-accountability-notifications-setting',authMiddleWare,pref_controller.updateAccountabilityNotificationsSetting)

module.exports=muslim_pref_route