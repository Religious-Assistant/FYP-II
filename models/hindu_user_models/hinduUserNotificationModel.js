const mongoose = require("mongoose");
const { appLogo } = require("../../controllers/utils/constants");

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
    icon:{
      type:String,
      default:appLogo
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HinduNotification", notificationSchema);