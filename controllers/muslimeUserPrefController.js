const User=require('../models/userModel')

const updatePrimaryMosque = async (req, res) => {
  console.log("Add primary mosque API hit");
  try {
    const { username, primaryMosque } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      await User.updateOne(
        { username: username },
        { $set: { primaryMosque: primaryMosque } }
      );
      res.send({ success: true, msg: "Primary Mosque Updated" });
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
    console.log(`User: ${username} Tru/False: ${state}`)
  } catch (error) {
    res.status(400).send(error.message);
  }
};



const updateAccountabilityNotificationsSetting= async (req, res) => {
  console.log("updateNamazNotificationsSetting API hit");
  try {
    const { username, state } = req.body;

  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAutoSilentSettings= async (req, res) => {
  console.log("updateAutoSilentSettings API hit");
  try {
    const { username, state } = req.body;

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