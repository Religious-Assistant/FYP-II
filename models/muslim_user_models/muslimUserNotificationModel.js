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
        "EID_NAMAZ",
        "DAILY_NAMAZ",
        "NEW_ANNOUNCEMENT",
        "NEW_MOSQUE_ADDITION",
        "MOSQUE_CONSENSUS",
        "NEW_MOSQUE_UNVERIFIED",
        "IMAM_CONSENSUS",
        "IMAM_VERIFIED",
        "IMAM_UNVERIFIED",
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
    },
    causedBy:{type:String,default:""} //It may be caused by announcement, mosque consensus, mosque addition, rejection
      //So place announcement, mosque id
  },
  { timestamps: true }
);

module.exports = mongoose.model("MuslimNotification", notificationSchema);