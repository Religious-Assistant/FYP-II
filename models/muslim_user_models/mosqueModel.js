const mongoose=require('mongoose')

const mosqueSchema=mongoose.Schema({
    
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
    }
})

mosqueSchema.index({location:'2dsphere'})
 
module.exports=mongoose.model('Mosque', mosqueSchema)