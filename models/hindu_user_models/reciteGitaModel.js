const mongoose = require("mongoose");

const recitedChaptersSchema=mongoose.Schema({
    chapterNumber: {
        type: Number,
        default: 0,
        required:true,
    },
    chapterName: {
        type: String,
        default: "NONE",
        required:true,
      },
},)

const recitedSummarySchema=mongoose.Schema({
    summaryNumber: {
        type: Number,
        default: 0,
        required:true,
    },
    summaryName: {
        type: String,
        default: "NONE",
        required:true,
      },
},)

const reciteGitaSchema = mongoose.Schema({
  username: {     //Recited By
    type: String,
    required: true,
    unique: true,
  },
  recitedChapters:[recitedChaptersSchema],
  recitedSummaries:[recitedSummarySchema],
  chapterLastRead: {
    verseNumber: {
      type: Number,
      default: 0,
    },
    chapterNumber: {
      type: Number,
      default: 0,
    },
  },
  summaryLastRead:{
      type: Number,
      default: 0,
  },
},{timestamp:true});


module.exports = mongoose.model("GitaRecitation", reciteGitaSchema);
