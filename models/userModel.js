const bcrypt = require('bcrypt');
const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
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
        default:'avatar.png'
    },
    location:{
        type:{typr:String},
        coordinates:[]
    },
    deviceToken:{
        type:String,
        required:true   //Get device token and store here for Notifications
    }
})

userSchema.pre('save',function(next){
    const user=this;
    bcrypt.hash(user.password,5,function(err, hash){
        if(!err && hash){
            user.password=hash;
            next();
        }
    })
})

userSchema.index({location:'2dsphere'})

module.exports=mongoose.model('User', userSchema)