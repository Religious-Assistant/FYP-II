const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const recitedSurahsSchema=mongoose.Schema({
    surahNumber: {
        type: Number,
        default: 0,
        required:true,
    },
    surahName: {
        type: String,
        default: "NONE",
        required:true,
      },
},)

const recitedParahsSchema=mongoose.Schema({
    parahNumber: {
        type: Number,
        default: 0,
        required:true,
    },
    parahName: {
        type: String,
        default: "NONE",
        required:true,
      },
},)

const reciteQuranSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  recitedSurahs:[recitedSurahsSchema],
  recitedParahs:[recitedParahsSchema],
  surahLastRead: {
    verseNumber: {
      type: Number,
      default: 0,
    },
    surahNumber: {
      type: Number,
      default: 0,
    },
  },
  parahLastRead: {
    verserNumber: {
      default: 0,
      type: Number,
    },
    surahNumber: {
      type: Number,
      default: 0,
    },
    parahNumber: {
      type: Number,
      default: 0,
    },
  },
});


module.exports = mongoose.model("QuranRecitation", reciteQuranSchema);
