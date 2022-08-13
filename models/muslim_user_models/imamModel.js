const mongoose=require('mongoose')

const imamSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    mosqueId:{
        type:String,
        unique:true,
    },
    verified:{
        type:Boolean,
        default:false
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

module.exports=mongoose.model('Imam', imamSchema)