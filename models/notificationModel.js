const mongoose=require('mongoose')

const notificationSchema=mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:[  'EID_NAMAZ',
                'DAILY_NAMAZ',
                'NEW_ANNOUNCEMENT',
                'MOSQUE_ADDED',
                'MOSQUE_CONSENSUS',
                'IMAM_CONSENSUS',
                'SETTINGS_CHANGED'
            ],
        required:true
    },
    receivedBy:{       //username here
        type:String,
        required:true
    },
    isOpenedByUser:{
        type:Boolean,
        default:false
    }

},{timestamps: true })
 
module.exports=mongoose.model('Notification', notificationSchema)