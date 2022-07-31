const LearnNamaz = require("../../models/muslim_user_models/learnNamazModel");

const updateProgress=async(req, res)=>{
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not update Namaz Progress'})
  }
}

//Take username and return whole information about user performance
const getProgress=async(req, res)=>{
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not get Progress'})
  }
}

module.exports={
  updateProgress,
  getProgress
}