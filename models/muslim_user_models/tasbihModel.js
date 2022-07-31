const mongoose=require('mongoose')

const tasbihSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        ref:'User',
    },
    count:{
        type:Number,
        default:0,
    }
})

module.exports=mongoose.model('Tasbih', tasbihSchema)