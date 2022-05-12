const mongoose=require('mongoose')

const user=mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    religion:{
        type: Number,
        required: true
    },

}, {timestamps: true})

module.exports=mongoose.model('User', user)