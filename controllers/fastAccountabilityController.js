const FastAccountability = require("../models/fastAccountabilityModel");

const updateFastAccuntability=async(req, res)=>{

  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not update Fast Accountability'})
  }
}

//Takes date in GET 
const getFastAccuntability=async(req, res)=>{

  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not Get Fast Accountability'})
  }
}


module.exports={
  updateFastAccuntability,
  getFastAccuntability
}