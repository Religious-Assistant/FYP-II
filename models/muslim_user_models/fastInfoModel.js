const mongoose=require('mongoose')

const fastInfoSchema=mongoose.Schema({

    openingDua:{
        type:String,
        default:'Dua here'
    },
    breakingDua:{
        type:String,
        default:'Dua here'
    },
    dos:{
        type:Array
    },
    donots:{
        type:Array
    }

})
 
module.exports=mongoose.model('FastInfo', fastInfoSchema)