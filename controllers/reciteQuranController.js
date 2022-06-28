const QuranRecitation = require("../models/reciteQuranModel");

const saveRecitationProgress=async(req, res)=>{
  console.log('Save recitation progress API hit')
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not Save Progress'})
  }
}

//Take surahNumber, verserNum, and ParahNum
const saveLastRead=async(req, res)=>{
  console.log('Last Read progress API hit')
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not Save Last Read/Tag'})
  }
}

//Take surahNumber, verserNum, and ParahNum
const getRecitationStats=async(req, res)=>{
  console.log('GET recitation stats API hit')
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not get Recitation Stats'})
  }
}


module.exports={
  saveRecitationProgress,
  saveLastRead,
  getRecitationStats
}