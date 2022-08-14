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

module.exports = mongoose.model("HinduNotification", notificationSchema);