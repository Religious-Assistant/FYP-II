const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "NEW_ANNOUNCEMENT",
        "TEMPLE_ADDED",
        "TEMPLE_CONSENSUS",
        "SETTINGS_CHANGED",
      ],
      required: true,
    },
    receivedBy: {
      //username here
      type: String,
      required: true,
      ref: "User",
    },
    isOpenedByUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
