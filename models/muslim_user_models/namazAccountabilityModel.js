const mongoose = require("mongoose");

const prayerSchema = mongoose.Schema({
  namaz: {
    type: String,
  },
  hasPrayed: {
    default: false,
  },
  date:{
    type:Date,
    required:true,
  }
});

const namazAccountabilitySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  prayers: [prayerSchema],
});

module.exports = mongoose.model(
  "NamazAccountability",
  namazAccountabilitySchema
);