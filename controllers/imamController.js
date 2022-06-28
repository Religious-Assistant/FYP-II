const Imam = require("../models/imamModel");

const becomeImam=async(req, res)=>{
  console.log('Become Imam API hit')
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not Become Imam'})
  }
}

module.exports={
  becomeImam
}