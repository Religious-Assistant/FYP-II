const mongoose = require("mongoose");
const { FUNERAL, TEMPLE_CONSENSUS, NEW_TEMPLE_ADDITION, NEW_TEMPLE_UNVERIFIED } = require("../../controllers/utils/constants");

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
        FUNERAL,
        TEMPLE_CONSENSUS,
        NEW_TEMPLE_ADDITION,
        NEW_TEMPLE_UNVERIFIED,
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
    causedBy:{type:String,default:""}
  },
  { timestamps: true }
);

module.exports = mongoose.model("HinduNotification", notificationSchema);