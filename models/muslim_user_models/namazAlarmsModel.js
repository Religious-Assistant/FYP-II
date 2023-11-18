const mongoose=require('mongoose')

const alarmsSchema=mongoose.Schema({

    username:{
        type:String,
        required:true,
    },
    fajr:{
        type: String,
        default:"NONE",
    },
    zuhr:{
        type: String,
        default:"NONE",
    },
    asr:{
        type: String,
        default:"NONE",
    },
    maghrib:{
        type: String,
        default:"NONE",
    },
    isha:{
        type: String,
        default:"NONE",
    },         
})
 
module.exports=mongoose.model('NamazAlarms', alarmsSchema)