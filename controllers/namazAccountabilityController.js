const  NamazAccountability = require("../models/namazAccountabilityModel");

const updateNamazAccuntability=async(req, res)=>{

  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not update Namaz Accountability'})
  }
}

//Takes date in get method and returns Namaz accountability on that date 
const getNamazAccuntability=async(req, res)=>{

  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not Get Namaz Accountability'})
  }
}


module.exports={
  updateNamazAccuntability,
  getNamazAccuntability
}