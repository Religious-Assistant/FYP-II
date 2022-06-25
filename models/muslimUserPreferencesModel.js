const mongoose=require('mongoose')

const muslimUserPreferencesSchema=mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },
    primaryMosque:{
        type:String,
        required:true
    },
    phoneSilent:{       //Silent mobile at Namaz time
        type:Boolean,
        required:true,
        default:true
    },
    namazNotifications:{    //Get Namaz Notifications
        type:Boolean,
        required:true,
        default:true

    },
    accountabilityNotifications:{    //Get Accountability Notifications at 10 PM daily
        type:Boolean,
        required:true,
        default:true
    },
   
})

 
module.exports=mongoose.model('MuslimPreference', muslimUserPreferencesSchema)