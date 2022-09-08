const NamazAccountability = require("../../models/muslim_user_models/namazAccountabilityModel");

const updateNamazAccuntability = async (req, res) => {
  console.log(`Updated namaz Accountability API hit`);
  try {
    const { namazInfo, username, date } = req.body;

    const updatedAccountability=await NamazAccountability.findOneAndUpdate(
      { username, date },
      { ...namazInfo, date, username },
      { upsert: true, new:true }
    ).catch((err) => {
      console.log(err);
    });

    if(updatedAccountability){
      res.status(200).send({ success: true, msg: "Updated Successfully", data:updatedAccountability });
    }
    else{
      res.status(400).send({ success: true, msg: "Could not update" });
    }

  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not update Namaz Accountability" });
  }
};

//Takes date in get method and returns Namaz accountability on that date
const getNamazAccuntability = async (req, res) => {
  console.log(`GET accountability API hit`);
  try {
    const { username, date } = req.body;
    const accountability = await NamazAccountability.findOne({ username, date });

    if (accountability) {
      res.status(200).send({ success: true, data: accountability });
    } else {
      res.status(200).send({
        success: true,
        data: {username:username, date:date, fajr:false, zuhr:false,asr:false,maghrib:false, isha:false},
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
