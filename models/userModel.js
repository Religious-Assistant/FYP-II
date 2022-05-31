const mongoose=require('mongoose')

const user=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
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
    verified:{
        type:Boolean,
        default:false,
    },
    avatar:{
        type: String,
    },
    location:[
        {
            latitude:Number,
            longitude:Number
        }
    ],
    primaryMosque:String,

}, {timestamps: true})

//Can be used for notifications

// user.post('save',(doc, next)=>{
//     console.log('New document inserted')
//     next();
// })

module.exports=mongoose.model('User', user)