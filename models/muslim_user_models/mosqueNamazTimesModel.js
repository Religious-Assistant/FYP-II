const mongoose = require("mongoose");

const subDoc = mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const namazTimeSchema = mongoose.Schema(
  {
    mosqueId: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
    fajr: subDoc,
    zuhr: subDoc,
    asr: subDoc,
    maghrib: subDoc,
    isha: subDoc,
  },
  { timestamp: true }
);

module.exports = mongoose.model("MosqueNamazTimes", namazTimeSchema);
