const express=require('express')
const { updatePrimaryTemple, updateVegNotificationSettings, updateAutoSilentSettings } = require('../../controllers/hindu_user_controllers/hinduUserPrefController')
const hindu_pref_route=express()

const authMiddleWare=require('../../middlewares/authMiddleWare')

//apply middleware tp check religion

hindu_pref_route.patch('/update-primary-temple',authMiddleWare,updatePrimaryTemple)
hindu_pref_route.patch('/update-auto-silent-settings-for-hindu-user',authMiddleWare,updateAutoSilentSettings)
hindu_pref_route.patch('/update-veg-notifications-setting',authMiddleWare,updateVegNotificationSettings)


module.exports=hindu_pref_route