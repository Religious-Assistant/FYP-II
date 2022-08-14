const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["FUNERAL", "OTHER"],
      required: true,
    },
    announcedBy: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [],
    },
    targetAudience: [{  type: String}],
    avatar:{type:String}
  },
  { timestamps: true }
);

announcementSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("MuslimAnnouncement", announcementSchema);