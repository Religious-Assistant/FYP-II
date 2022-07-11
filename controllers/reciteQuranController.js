const QuranRecitation = require("../models/reciteQuranModel");
const User = require("../models/userModel");

const markSurahAsRead = async (req, res) => {
  console.log("Mark Surah as Read progress API hit");
  try {
    const { username, surahNumber, surahName } = req.body;
    const user_data = await User.findOne({ username: username });
    if (user_data) {
      
      const surahsAfterMarkASRead=await QuranRecitation.findOneAndUpdate(
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

      res.send({ success: true, msg: `Surah ${surahName} marked as completed`, data:surahsAfterMarkASRead });
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
      
      const recitedSurahs=await QuranRecitation.updateOne(
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

      res.send({ success: true, msg: `Surah ${surahName} marked as Incomplete`, data:recitedSurahs });
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
      
      const recitedParahs=await QuranRecitation.findOneAndUpdate(
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

      res.send({ success: true, msg: `Parah ${parahName} marked as completed`, data:recitedParahs });
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
      
      const recitedParahs=await QuranRecitation.updateOne(
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

      res.send({ success: true, msg: `Parah ${parahName} marked as Incomplete`, data:recitedParahs });
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
    const isUpdatedLastReadSurah=await QuranRecitation.updateOne(
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

    if(isUpdatedLastReadSurah.acknowledged){
      const surahLastRead= await QuranRecitation.findOne({
        username:username,
      },{
          surahLastRead:1, _id:0
      }) 
      res.send({ success: true, msg: `Updated ${surahNumber} Parah as last read`, data:surahLastRead});
      return;
    } 
    res.send({ success: true, msg: `Already saved as last read`, data:null});
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
    console.log(req.body)
    const isUpdatedLastReadParah=await QuranRecitation.updateOne(
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

    if(isUpdatedLastReadParah){

      const parahLastRead= await QuranRecitation.findOne({
        username:username,
      },{
          parahLastRead:1, _id:0
      }) 
      res.send({ success: true, msg: `Updated ${parahNumber} Parah as last read`, data:parahLastRead});
      return;
    } 
    res.send({ success: true, msg: `Already saved as last read`, data:null});

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
  console.log("CHECK SURAH is read API hit");
  try {

    const {username,surahName}=req.body
    const record=await QuranRecitation.find({
      username:username,
      'recitedSurahs.surahName':surahName
    })

    if(record.length==0){
      return res.status(200).send({success:true, msg:'Fetched Surah Read Status Successfully', data:null})    
    }
    res.status(200).send({success:true, msg:'Fetched Surah Read Status Successfully', data:record})
    return;
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Stats" });
  }
};

//Get parah Name and return if it is recited
const checkParahIsRead = async (req, res) => {
  console.log("CHECK PARAH is read API hit");
  try {

    const {username, parahName}=req.body
    const record=await QuranRecitation.find({
      username:username,
      'recitedParahs.parahName':parahName
    })

    if(record.length==0){
      return res.status(200).send({success:true, msg:'Fetched Parah Read Status Successfully', data:null})    
    }
    res.status(200).send({success:true, msg:'Fetched Parah Read Status Successfully', data:record})
    return;
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Recitation Status" });
  }
};

const getLastReadSurah = async (req, res) => {
  console.log("GET LAST READ SURAH API hit");
  try {

    const {username}=req.body
    const surahLastRead= await QuranRecitation.findOne({
      username:username,
    },{
        surahLastRead:1, _id:0
    }) 

      res.send({ success: true, msg: `Fetched Last read Surah`, data:surahLastRead});
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get last read surah" });
  }
};

const getLastReadParah = async (req, res) => {
  console.log("GET LAST READ PARAH API hit");
  try {

    const {username}=req.body
    const parahLastRead= await QuranRecitation.findOne({
      username:username,
    },{
        parahLastRead:1, _id:0
    }) 

      res.send({ success: true, msg: `Fetched Last read Parah`, data:parahLastRead});
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: "Could not get Last read parah" });
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
  checkSurahIsRead,
  checkParahIsRead,
  getLastReadSurah,
  getLastReadParah
};
