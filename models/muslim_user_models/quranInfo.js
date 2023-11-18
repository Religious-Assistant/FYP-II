const mongoose = require("mongoose");

const quranInfoSchema = mongoose.Schema({
  parahs: [],
});

module.exports = mongoose.model("QuranInfo", quranInfoSchema);
