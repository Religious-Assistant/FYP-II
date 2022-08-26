const NamazAlarmTimes = require("../../models/muslim_user_models/namazAlarmsModel");

const updateNamazAlarmsTimes = async (req, res) => {
  console.log("Update Namaz Alarms times API hit");
  try {
    const { username, fajr, zuhr, asr, maghrib, isha } = req.body;
    const previousData=await NamazAlarmTimes.findOne({username})

    const updatedAlamrs = await NamazAlarmTimes.findOneAndUpdate(
      { username },
      {
        $set: {
          fajr: fajr?.length > 0 ? fajr : previousData.fajr,
          zuhr: zuhr?.length > 0 ? zuhr : previousData.zuhr,
          asr: asr?.length > 0 ? asr : previousData.asr,
          maghrib: maghrib?.length > 0 ? maghrib : previousData.maghrib,
          isha: isha?.length > 0 ? isha : previousData.isha,
        },
      },
      { new: true }
    );

    if (updatedAlamrs) {
      res.status(200).send({
        success: true,
        msg: `Updated Successfully`,
        data: updatedAlamrs,
      });
    } else {
      res.status(200).send({ success: false, msg: `Could not update times` });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getNamazAlarmsTimesForUser = async (req, res) => {
  console.log("Get Alarms Times For User API hit", req.body);
  try {
    const { username } = req.body;

    const alarms = await NamazAlarmTimes.findOne({ username });

    if (alarms) {
      res.status(200).send({
        success: true,
        msg: `Fetched Successfully`,
        data: alarms,
      });
    } else {
      res.status(200).send({ success: false, msg: `Could not find times` });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  updateNamazAlarmsTimes,
  getNamazAlarmsTimesForUser,
};
