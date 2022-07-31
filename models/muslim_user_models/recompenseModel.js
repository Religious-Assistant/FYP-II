const mongoose=require('mongoose')

const recompenseSchema=mongoose.Schema({

    namaz:{
        missedFarzRecompense:{
            type:String,
            default:'Guidelin here'
        },
        offeredLateRecompense:{
            type:String,
            default:'Guidelin here'
        },
        forgotRakahRecompense:{
            type:String,
            default:'Guidelin here'
        },        
    },
    fast:{
        missedFastRecompense:{
            type:String,
            default:'Guidelin here'
        },
        brokeBeforeTimeRecompense:{
            type:String,
            default:'Guidelin here'
        },
        comittedSinRecompense:{
            type:String,
            default:'Guidelin here'
        },
    },
    wudu:{
        missedWuduRecompense:{
            type:String,
            default:'Guideline here'
        },
        brokeWuduRecompense:{
            type:String,
            default:'Guideline here'
        },
        missedStepRecompense:{
            type:String,
            default:'Guideline here'
        }
    }

})
 
module.exports=mongoose.model('RecompenseGuideline', recompenseSchema)