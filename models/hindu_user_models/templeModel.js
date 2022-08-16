const mongoose=require('mongoose')

const templeSchema=mongoose.Schema({
    
    mosqueName:{
        type:String,
        required:true
    },
    location:{
        type:{
            type:String, 
        },
        coordinates:[]
    },
    addedBy:{
        type:String,
        required:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    receivers:[],
    upVotes:{
        type:Number,
        default:0
    },
    downVotes:{
        type:Number,
        default:0
    }
})

templeSchema.index({location:'2dsphere'})
 
module.exports=mongoose.model('Temple', templeSchema)