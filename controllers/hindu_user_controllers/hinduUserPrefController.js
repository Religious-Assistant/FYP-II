const HinduPreference = require("../../models/hindu_user_models/hinduUserPreferencesModel");

const updatePrimaryTemple = async (req, res) => {
  console.log("Update primary Temple API hit");
  try {
    const { username, primaryTemple } = req.body;


    const updatedTemple = await HinduPreference.findOneAndUpdate(
      { username },
      { $set: { primaryTemple: primaryTemple } },
      { new: true }
    );

    if (updatedTemple) {

      res.send({
        success: true,
        msg: "Primary Temple Updated",
        data: updatedTemple,
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};



const updateAutoSilentSettings = async (req, res) => {
  console.log("update Auto Silent Settings API hit");
  try {
    const { username, state } = req.body;

    const user = await HinduPreference.findOne({ username });
    if (user) {
      await HinduPreference.updateOne(
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

const updateVegNotificationSettings = async (req, res) => {
  console.log("Update Veg Notification API hit");
  try {
    const { username, state } = req.body;


    const updatedPrefs = await HinduPreference.findOneAndUpdate(
      { username },
      { $set: { vegNotifications: state } },
      { new: true }
    );

    if (updatedPrefs) {

      res.send({
        success: true,
        msg: "Updated",
        data: updatedPrefs,
      });
    } else {
      res.status(400).send({ success: false, msg: "No such user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = {
  updatePrimaryTemple,
  updateAutoSilentSettings,
  updateVegNotificationSettings
};
