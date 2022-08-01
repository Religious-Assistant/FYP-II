const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["EID_NAMAZ", "FUNERAL", "OTHER"],
      required: true,
    },
    announcedBy: {
      //username here
      type: String,
      required: true,
      ref: "User",
    },
    location: {
      //From where it was announced,
      // so we can display to people around that location
      type: {
        type: String,
      },
      coordinates: [],
    },
    targetAudience: [{ username: { type: String, ref: "User" } }],
  },
  { timestamps: true }
);

announcementSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Announcement", announcementSchema);
