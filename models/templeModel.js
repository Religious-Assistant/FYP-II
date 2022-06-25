const mongoose=require('mongoose')

const templeSchema=mongoose.Schema({
    
    templeName:{
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
        required:true
    },
    verified:{
        type:Boolean,
        default:false,
    }
})

templeSchema.index({location:'2dsphere'})
 
module.exports=mongoose.model('Temple', templeSchema)