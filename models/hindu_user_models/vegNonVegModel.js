const mongoose=require('mongoose')

const vegNonVeg=mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    monday:{
        type:Boolean,
        default:false
    },
    tuesday:{
        type:Boolean,
        default:false
    },
    wednesday:{
        type:Boolean,
        default:false
    },
    thursday:{
        type:Boolean,
        default:false
    },
    friday:{
        type:Boolean,
        default:false
    },
    saturday:{
        type:Boolean,
        default:false
    },
    sunday:{
        type:Boolean,
        default:false
    },
})

module.exports=mongoose.model('VegNonVeg', vegNonVeg)