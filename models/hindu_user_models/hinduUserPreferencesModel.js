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
        required:true,
        default:'NONE'
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
})

 
module.exports=mongoose.model('HinduPreference', hinduUserPreferencesSchema)