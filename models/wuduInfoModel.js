const mongoose=require('mongoose')

const wuduInfoSchema=mongoose.Schema({

    wuduSteps:[
        {
            stepNumber:{
                type:Number,
            },
            description:{
                type:String,
            }
        }
    ],
    dos:{
        type:Array
    },
    donots:{
        type:Array
    }

})
 
module.exports=mongoose.model('WuduInfo', wuduInfoSchema)