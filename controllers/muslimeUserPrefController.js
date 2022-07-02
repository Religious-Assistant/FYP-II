const User=require('../models/userModel')
const MuslimPreferences=require('../models/muslimUserPreferencesModel')

const updatePrimaryMosque = async (req, res) => {
  console.log("Add primary mosque API hit");
  try {
    const { username, primaryMosque } = req.body;

    const user = await MuslimPreferences.findOne({ username });
    if (user) {
      await MuslimPreferences.updateOne(
        { username: username },
        { $set: { primaryMosque: primaryMosque } }
      );
      res.send({ success: true, msg: "Primary Mosque Updated"});
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateNamazNotificationsSetting= async (req, res) => {
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



const updateAccountabilityNotificationsSetting= async (req, res) => {
  console.log("updateNamazNotificationsSetting API hit");
  try {
    const { username, state } = req.body;
    
    const user = await MuslimPreferences.findOne({ username });
    if (user) {
      await MuslimPreferences.updateOne(
        { username: username },
        { $set: { accountabilityNotifications: state } }
      );
      res.send({ success: true, msg: "Updated Accountability Notification Setting" });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAutoSilentSettings= async (req, res) => {
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

module.exports={
    updatePrimaryMosque,
    updateAutoSilentSettings,
    updateAccountabilityNotificationsSetting,
    updateNamazNotificationsSetting
}