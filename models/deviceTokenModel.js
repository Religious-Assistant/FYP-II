const mongoose=require('mongoose')

//User can login from multiple devices, store all devices tokens
const deviceTokenSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    deviceToken:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('DeviceToken', deviceTokenSchema)