const QuranRecitation = require("../models/reciteQuranModel");
const User = require("../models/userModel");

const markSurahAsRead = async (req, res) => {
  console.log("Mark Surah as Read progress API hit");
  try {
    const { username, surahNumber, surahName } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      // const updatedSurahRecitation = await QuranRecitation.findOneAndUpdate({
      //   username:username,
      //   'recitedSurahs.surahNumber':surahNumber,
      //   'recitedSurahs.surahName':surahName
      // },{

      // },
      // {upsert:true}
      // );

      const updatedSurahRecitation = await QuranRecitation.findOneAndUpdate(
        {
          username: username,
          'recitedSurahs.surahName':{$ne:surahName}
        },
        {
          $addToSet:{
            recitedSurahs:{
              surahName:surahName,
              surahNumber:surahNumber
            }
          } 
        },
      );

      res.send({ success: true, msg: `Surah ${surahName} marked as completed` });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }

    res.send({ success: true, msg: "Updated Progress successfully" });
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Mark as complete" });
  }
};

const markParahAsRead = async (req, res) => {
  console.log("Mark Parah as Read progress API hit", req.body);
  try {
    res.send({ success: true, msg: "Updated Progress successfully" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Save Last Read/Tag" });
  }
};

//Take surahNumber, verserNum, and ParahNum
const updateLastReadSurah = async (req, res) => {
  console.log("Last Read Surah progress API hit", req.body);
  try {
    res.send({ success: true, msg: "Updated Last read successfully" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Save Last Read/Tag" });
  }
};

//Take surahNumber, verserNum, and ParahNum
const updateLastReadParah = async (req, res) => {
  console.log("Last Read Parah progress API hit");
  try {
    res.send({ success: true, msg: "Updated Last read successfully" });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Save Last Read/Tag" });
  }
};

//Take surahNumber, verserNum, and ParahNum
const getRecitationStats = async (req, res) => {
  console.log("GET recitation stats API hit");
  try {
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Stats" });
  }
};

module.exports = {
  markSurahAsRead,
  markParahAsRead,
  updateLastReadSurah,
  updateLastReadParah,
  getRecitationStats,
};
