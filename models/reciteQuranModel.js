const bcrypt = require('bcrypt');
const mongoose=require('mongoose')

const reciteQuranSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    recitedVerses:[
        {
            verserNumber:Number,
            surahNumber:Number,
            parahNumber:Number,
        }
    ],
    recitedSurahs:[
        {
            surahNumber:Number,
            surahName:String,
            parahNumber:Number,
        }
    ],
    lastRead:{
            verserNumber:Number,
            surahNumber:Number,
            parahNumber:Number
    }

})

module.exports=mongoose.model('QuranRecitation', reciteQuranSchema)