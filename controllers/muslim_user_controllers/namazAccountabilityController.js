const NamazAccountability = require("../../models/muslim_user_models/namazAccountabilityModel");

const updateNamazAccuntability = async (req, res) => {
  console.log(`Updated namaz Accountability API hit`, req.body);
  try {
    const { namazInfo, username, date } = req.body;
    await NamazAccountability.findOneAndUpdate(
      { date: date },
      { username, prayers: namazInfo, date },
      { upsert: true }
    ).catch((err) => {
      console.log(err);
    });

    res.status(200).send({ success: true, msg: "Updated Successfully" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not update Namaz Accountability" });
  }
};

//Takes date in get method and returns Namaz accountability on that date
const getNamazAccuntability = async (req, res) => {
  console.log(`GET accountability API hit`, req.body);
  try {
    const { username, date } = req.body;
    const accountability = await NamazAccountability.find({ username, date });

    if (accountability.length > 0) {
      console.log('Comes')
      res.status(200).send({ success: true, data: accountability });
    } else {
      //Send default values
      res.status(200).send({
        success: true,
        data: [
          {
            prayers: [
              {
                time: "Fajr",
                id: 0,
                hasPrayed: false,
              },
              {
                time: "Zuhr",
                id: 1,
                hasPrayed: false,
              },
              {
                time: "Asr",
                id: 2,
                hasPrayed: false,
              },
              {
                time: "Maghrib",
                id: 3,
                hasPrayed: false,
              },
              {
                time: "Isha",
                id: 4,
                hasPrayed: false,
              },
            ],
          },
        ],
      });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Get Namaz Accountability" });
  }
};

module.exports = {
  updateNamazAccuntability,
  getNamazAccuntability,
};
