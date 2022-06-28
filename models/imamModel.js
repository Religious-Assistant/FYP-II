const mongoose=require('mongoose')

const imamSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    mosqueId:{
        type:mongoose.Types.ObjectId,
        unique:true,
    },
})

module.exports=mongoose.model('Imam', imamSchema)