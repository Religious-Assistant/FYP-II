const mongoose=require('mongoose')

const muslimUserPreferencesSchema=mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },
    primaryMosque:{
        type:String,
        default:'NONE',
    },
    phoneSilent:{       //Silent mobile at Namaz time
        type:Boolean,
        default:true
    },
    namazNotifications:{    //Get Namaz Notifications
        type:Boolean,
        default:true
    },
    accountabilityNotifications:{    //Get Accountability Notifications at 10 PM daily
        type:Boolean,
        default:true
    },
   
})

 
module.exports=mongoose.model('MuslimPreference', muslimUserPreferencesSchema)