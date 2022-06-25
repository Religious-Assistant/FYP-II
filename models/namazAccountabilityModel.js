const mongoose=require('mongoose')

const namazAccountabilitySchema=mongoose.Schema({

    username:{
        type:String,
        required:true,
    },
    prayers:[
        {
            namaz:{
                type:String
            },
            hasPrayed:{
                default:false
            }
        }
    ],

},{timestamps: true })
 
module.exports=mongoose.model('NamazAccountability', namazAccountabilitySchema)