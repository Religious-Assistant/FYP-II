const MosqueNamazTimes = require("../../models/muslim_user_models/mosqueNamazTimesModel");
const MuslimPref = require("../../models/muslim_user_models/muslimUserPreferencesModel");
const DeviceToken = require("../../models/common_models/deviceTokenModel");
const User = require("../../models/common_models/userModel");
const { notifyUsers, sendNotificationWithData } = require("../utils/utils");
const {
  UPDATE_NAMAZ_TIMES_IN_MOSQUE_CHANNEL_ID,
  namaz_alert_notification_logo,
} = require("../utils/constants");

const updateNamazTimes = async (req, res) => {
  console.log("Update Namaz times API hit");
  try {
    const { mosqueId, fajr, zuhr, asr, maghrib, isha, updatedBy } = req.body;

    const existingDetails = await MosqueNamazTimes.findOne({ mosqueId });

    const updatedTimes = await MosqueNamazTimes.findOneAndUpdate(
      { mosqueId: mosqueId },
      {
        $set: {
          updatedBy: updatedBy,
          fajr: {
            startTime:
              fajr.startTime.length > 0
                ? fajr.startTime
                : existingDetails?.fajr.startTime,
            endTime:
              fajr.endTime.length > 0
                ? fajr.endTime
                : existingDetails?.fajr.endTime,
          },
          zuhr: {
            startTime:
              zuhr.startTime.length > 0
                ? zuhr.startTime
                : existingDetails?.zuhr.startTime,
            endTime:
              zuhr.endTime.length > 0
                ? zuhr.endTime
                : existingDetails?.zuhr.endTime,
          },
          asr: {
            startTime:
              asr.startTime.length > 0
                ? asr.startTime
                : existingDetails?.asr.startTime,
            endTime:
              asr.endTime.length > 0
                ? asr.endTime
                : existingDetails?.asr.endTime,
          },
          maghrib: {
            startTime:
              maghrib.startTime.length > 0
                ? maghrib.startTime
                : existingDetails?.maghrib.startTime,
            endTime:
              maghrib.endTime.length > 0
                ? maghrib.endTime
                : existingDetails?.maghrib.endTime,
          },
          isha: {
            startTime:
              isha.startTime.length > 0
                ? isha.startTime
                : existingDetails?.isha.startTime,
            endTime:
              isha.endTime.length > 0
                ? isha.endTime
                : existingDetails?.isha.endTime,
          },
        },
      },
      { new: true }
    );

    if (updatedTimes) {
      let times = [
        {
          fajr: {
            startTime: updatedTimes.fajr.startTime,
            endTime: updatedTimes.fajr.endTime,
          },
        },
        {
          zuhr: {
            startTime: updatedTimes.zuhr.startTime,
            endTime: updatedTimes.zuhr.endTime,
          },
        },
        {
          asr: {
            startTime: updatedTimes.asr.startTime,
            endTime: updatedTimes.asr.endTime,
          },
        },
        {
          maghrib: {
            startTime: updatedTimes.maghrib.startTime,
            endTime: updatedTimes.maghrib.endTime,
          },
        },
        {
          isha: {
            startTime: updatedTimes.isha.startTime,
            endTime: updatedTimes.isha.endTime,
          },
        },
      ];

      const updatedUsersTimes = await MuslimPref.updateMany(
        { primaryMosque: mosqueId },
        {
          $set: { namazTimes: times },
        }
      );

      if (updatedUsersTimes) {
        const muslimeUsers = await MuslimPref.find(
          { primaryMosque: mosqueId },
          {
            __v: 0,
            _id: 0,
            primaryMosque: 0,
            namazTimes: 0,
            phoneSilent: 0,
            namazNotifications: 0,
            accountabilityNotifications: 0,
          }
        );

        const receivers = await DeviceToken.find({}, { _id: 0, __v: 0 });
        const users = muslimeUsers.map((rec) => rec.username); //Get names only to use includes
        const targetDevices = receivers.filter((receiver) => {
          // if (receiver.username !== updatedBy) { //TODO: Don't send to self
          //Don't send to self
          return users.includes(receiver.username);
          // }
        });

        const payload = `${updatedTimes.fajr.startTime}|${updatedTimes.fajr.endTime}#${updatedTimes.zuhr.startTime}|${updatedTimes.zuhr.endTime}#${updatedTimes.asr.startTime}|${updatedTimes.asr.endTime}#${updatedTimes.isha.startTime}|${updatedTimes.isha.endTime}#${updatedTimes.isha.startTime}|${updatedTimes.isha.endTime}#`;
        let notifiedUsers = await sendNotificationWithData(
          "Updated Namaz Times",
          `${updatedBy.toUpperCase()} has updated times in your primary mosque`,
          targetDevices,
          UPDATE_NAMAZ_TIMES_IN_MOSQUE_CHANNEL_ID,
          namaz_alert_notification_logo,
          payload
        );

      }
      res.status(200).send({ success: true, data: updatedTimes });
    } else {
      res.status(400).send({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

const getTimesForUser = async (req, res) => {
  console.log("Get Times For User API hit");
  try {
    const { mosqueId } = req.body;

    const mosqueNamazTimes = await MosqueNamazTimes.findOne({
      mosqueId: mosqueId,
    });

    if (mosqueNamazTimes) {
    
      res.status(200).send({ success: true, data: mosqueNamazTimes });
    } else {
      res.status(200).send({ success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  updateNamazTimes,
  getTimesForUser,
};
