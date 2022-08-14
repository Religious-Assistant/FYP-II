const NamazTimings = require("../../models/muslim_user_models/namazTimingsModel");

const updateNamazTimes = async (req, res) => {
  
    console.log('Update Namaz times API hit')
    try {

    res.status(200).send({ success: true, msg: ``, data: [] });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTimesForUser = async (req, res) => {
  
    console.log('Get Times For User API hit', req.body)
    try {

    res.status(200).send({ success: true, msg: ``, data: [] });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports={
    updateNamazTimes,
    getTimesForUser
}