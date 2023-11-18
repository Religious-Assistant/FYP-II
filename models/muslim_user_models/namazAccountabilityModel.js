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
  fajr:{
    type:Boolean,
    default:false,
  },
  zuhr:{
    type:Boolean,
    default:false,
  },
  asr:{
    type:Boolean,
    default:false,
  },
  maghrib:{
    type:Boolean,
    default:false,
  },
  isha:{
    type:Boolean,
    default:false,
  },
  date:{
    type:Date,
    required:true,
  }
});

module.exports = mongoose.model(
  "NamazAccountability",
  namazAccountabilitySchema
);