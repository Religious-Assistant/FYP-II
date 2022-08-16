const mongoose=require('mongoose')
const { HOURS_24, HOURS_12, MINS_60, MINS_30 } = require('../../controllers/utils/constants')

const hinduUserPreferencesSchema=mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },
    primaryTemple:{
        type:String,
        required:true
    },
    phoneSilent:{       //Silent mobile when in Temple
        type:Boolean,
        required:true,
        default:true
    },
    vegNotifications:{    //Get Veg, non-veg Notifications
        type:Boolean,
        required:true,
        default:true

    },
    timeBeforeVegDay:{      //How much time before the day, notification should recieve
        type:String,
        required:true,
        enum:[MINS_30,MINS_60,HOURS_12,HOURS_24]
    }   
})

 
module.exports=mongoose.model('HinduPreference', hinduUserPreferencesSchema)