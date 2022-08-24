const FastAccountability = require("../../models/muslim_user_models/fastAccountabilityModel");

const updateFastAccuntability = async (req, res) => {
  console.log(`Update FAST accountability API hit`);
  try {
    const { hasFast, username, date } = req.body;

    const updatedAccountability = await FastAccountability.findOneAndUpdate(
      { username, date },
      { hasFast, date, username },
      { upsert: true, new: true }
    ).catch((err) => {
      console.log(err);
    });

    if (updatedAccountability) {
      res
        .status(200)
        .send({
          success: true,
          msg: "Updated Successfully",
          data: updatedAccountability,
        });
    } else {
      res.status(400).send({ success: true, msg: "Could not update" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not update Fast Accountability" });
  }
};

//Takes date in GET
const getFastAccuntability = async (req, res) => {
  console.log(`GET Fast accountability API hit`);
  try {
    const { username, date } = req.body;
    const accountability = await FastAccountability.findOne({ username, date });

    if (accountability) {
      res.status(200).send({ success: true, data: accountability });
    } else {
      res.status(200).send({
        success: true,
        data: [{ username: username, date: date, hasFast: false }],
      });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Get Fast Accountability" });
  }
};

module.exports = {
  updateFastAccuntability,
  getFastAccuntability,
};
