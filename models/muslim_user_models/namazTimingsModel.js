const mongoose=require('mongoose')

const namazTimingsSchema=mongoose.Schema({

    mosqueId:{
        type:String,
        required:true,
    },
    updatedBy:{                  //Updated By a user
        type:String,
        required:true,
    },
    fajr:[],    //0:startTime 1: endTime
    zuhr:[],
    asr:[],
    maghrib:[],
    isha:[]         
})
 
module.exports=mongoose.model('NamazTiming', namazTimingsSchema)