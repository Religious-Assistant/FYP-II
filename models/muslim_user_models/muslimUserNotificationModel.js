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
        "EID_NAMAZ",
        "DAILY_NAMAZ",
        "NEW_ANNOUNCEMENT",
        "MOSQUE_ADDED",
        "MOSQUE_CONSENSUS",
        "IMAM_CONSENSUS",
        "SETTINGS_CHANGED",
        "OTHER"
      ],
      required: true,
    },
    receivedBy: {
      type: String,
      required: true,
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

module.exports = mongoose.model("MuslimNotification", notificationSchema);
