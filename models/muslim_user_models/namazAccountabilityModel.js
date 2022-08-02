const mongoose = require("mongoose");

// const prayerSchema = mongoose.Schema({
//   namaz: {
//     type: String,
//   },
//   hasPrayed: {
//     default: false,
//   },
// });

const namazAccountabilitySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  prayers:[],
  date:{
    type:Date,
    required:true,
  }
});

module.exports = mongoose.model(
  "NamazAccountability",
  namazAccountabilitySchema
);