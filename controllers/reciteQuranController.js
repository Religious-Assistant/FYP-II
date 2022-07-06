const QuranRecitation = require("../models/reciteQuranModel");
const User = require("../models/userModel");

const markSurahAsRead = async (req, res) => {
  console.log("Mark Surah as Read progress API hit");
  try {
    const { username, surahNumber, surahName } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      
      await QuranRecitation.findOneAndUpdate(
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
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Mark as complete" });
  }
};

const markSurahAsUnRead = async (req, res) => {
  console.log("Mark Surah as Un Read progress API hit");
  try {
    const { username, surahName, surahNumber } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      
      await QuranRecitation.updateOne(
        {
          username: username,
          'recitedSurahs.surahName':surahName
        },
        {
          $pull:{
            recitedSurahs:{
              surahName:surahName,
              surahNumber:surahNumber
            }
          } 
        },
      );

      res.send({ success: true, msg: `Surah ${surahName} marked as Incomplete` });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Mark as incomplete" });
  }
};


const markParahAsRead = async (req, res) => {
  console.log("Mark Parah as Read progress API hit");
  try {
    const { username, parahNumber, parahName } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      
      await QuranRecitation.findOneAndUpdate(
        {
          username: username,
          'recitedParahs.parahName':{$ne:parahName}
        },
        {
          $addToSet:{
            recitedParahs:{
              parahName:parahName,
              parahNumber:parahNumber
            }
          } 
        },
      );

      res.send({ success: true, msg: `Parah ${parahName} marked as completed` });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Mark as complete" });
  }
};


const markParahAsUnRead = async (req, res) => {
  console.log("Mark Parah as Un Read progress API hit");
  try {
    const { username, parahName, parahNumber } = req.body;
    const user_data = await User.findOne({ username: username });

    if (user_data) {
      
      await QuranRecitation.updateOne(
        {
          username: username,
          'recitedParahs.parahName':parahName
        },
        {
          $pull:{
            recitedParahs:{
              parahName:parahName,
              parahNumber:parahNumber
            }
          } 
        },
      );

      res.send({ success: true, msg: `Parah ${parahName} marked as Incomplete` });
    } else {
      res.send({ success: false, msg: "User does not exist" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: "Could not Mark as incomplete" });
  }
};

//Take surahNumber, verserNum
const updateLastReadSurah = async (req, res) => {
  console.log("Last Read Surah progress API hit");
  try {

    const {username, surahNumber, verseNumber}=req.body
    await QuranRecitation.updateOne(
      {
        username: username,
      }, 
      {
        $set:{
          surahLastRead:{
            verseNumber:verseNumber,
            surahNumber:surahNumber
          }
        }
      },
    );

    res.send({ success: true, msg: `Updated ${surahNumber} Surah as last read` });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Save Last Read/Tag" });
  }
};

const updateLastReadParah = async (req, res) => {
  console.log("Last Read Parah progress API hit");
  try {

    const {username, surahNumber, verseNumber, parahNumber}=req.body
    console.log(verseNumber)
    await QuranRecitation.updateOne(
      {
        username: username,
      }, 
      {
        $set:{
          parahLastRead:{
            verseNumber:verseNumber,
            surahNumber:surahNumber,
            parahNumber:parahNumber,
            
          }
        }
      },
    );

    res.send({ success: true, msg: `Updated ${parahNumber} Parah as last read` });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not Save Last Read/Tag" });
  }
};


//Take username and return record for that user
const getRecitationStats = async (req, res) => {
  console.log("GET recitation stats API hit");
  try {

    const {username}=req.body
    const record=await QuranRecitation.find({
      username:username
    })

    if(record){
      res.send({success:true, msg:'Fetched Stats Successfully', data:record})
    }
    else{
      res
      .status(400)
      .send({ success: false, msg: `Could not get Recitation Stats for user ${username}` });
    }
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Stats" });
  }
};

//Get surah Name and return if it is recited
const checkSurahIsRead = async (req, res) => {
  console.log("CHECK SURAH is read");
  try {

    const {username,surahName}=req.body
    console.log(surahName, username)
    const record=await QuranRecitation.find({
      username:username,
      'recitedSurahs.surahName':surahName
    })

    res.send({success:true, msg:'Fetched Surah Read Status Successfully', data:record}) //record null if not read
    return;
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Stats" });
  }
};

module.exports = {
  markSurahAsRead,
  markSurahAsUnRead,
  markParahAsRead,
  markParahAsUnRead,
  updateLastReadSurah,
  updateLastReadParah,
  getRecitationStats,
  checkSurahIsRead
};
