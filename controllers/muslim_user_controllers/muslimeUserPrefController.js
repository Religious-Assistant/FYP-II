const User = require("../../models/common_models/userModel");
const MuslimPreferences = require("../../models/muslim_user_models/muslimUserPreferencesModel");
const NamazTimings = require("../../models/muslim_user_models/namazTimingsModel");

const updatePrimaryMosque = async (req, res) => {
  console.log("Update primary mosque API hit");
  try {
    const { username, primaryMosque } = req.body;

    const mosqueNamazTimes = await NamazTimings.findOne({
      mosqueId: primaryMosque,
    });
    let times = [
      mosqueNamazTimes.fajr,
      mosqueNamazTimes.zuhr,
      mosqueNamazTimes.asr,
      mosqueNamazTimes.maghrib,
      mosqueNamazTimes.isha,
    ];

    const updateMosque = await MuslimPreferences.findOneAndUpdate(
      { username },
      { $set: { primaryMosque: primaryMosque,namazTimes:times } },
      { new: true }
    );

    if (updateMosque) {

      res.send({
        success: true,
        msg: "Primary Mosque Updated",
        data: updateMosque,
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateNamazNotificationsSetting = async (req, res) => {
  console.log("updateNamazNotificationsSetting API hit");
  try {
    const { username, state } = req.body;

    const user = await MuslimPreferences.findOne({ username });
    if (user) {
      await MuslimPreferences.updateOne(
        { username: username },
        { $set: { namazNotifications: state } }
      );
      res.send({ success: true, msg: "Updated Namaz Notification Setting" });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAccountabilityNotificationsSetting = async (req, res) => {
  console.log("updateNamazNotificationsSetting API hit");
  try {
    const { username, state } = req.body;

    const user = await MuslimPreferences.findOne({ username });
    if (user) {
      await MuslimPreferences.updateOne(
        { username: username },
        { $set: { accountabilityNotifications: state } }
      );
      res.send({
        success: true,
        msg: "Updated Accountability Notification Setting",
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAutoSilentSettings = async (req, res) => {
  console.log("updateAutoSilentSettings API hit");
  try {
    const { username, state } = req.body;

    const user = await MuslimPreferences.findOne({ username });
    if (user) {
      await MuslimPreferences.updateOne(
        { username: username },
        { $set: { phoneSilent: state } }
      );
      res.send({ success: true, msg: "Updated Auto-Silent Settings Setting" });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  updatePrimaryMosque,
  updateAutoSilentSettings,
  updateAccountabilityNotificationsSetting,
  updateNamazNotificationsSetting,
};
