const mongoose=require('mongoose')

const namazTimingsSchema=mongoose.Schema({

    mosqueId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    fajr:{
        startTime:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        },
    },
    zuhr:{
        startTime:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        },
    },
    asr:{
        startTime:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        },
    },
    maghrib:{
        startTime:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        },
    },
    isha:{
        startTime:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        },
    },
})
 
module.exports=mongoose.model('NamazTiming', namazTimingsSchema)