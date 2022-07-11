const  Notification = require("../models/notificationModel");

const getNotifications=async(req, res)=>{

  console.log(`GET NOTFS API hit`)
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not load Notifications'})
  }
}

const deleteNotification=async(req, res)=>{

  console.log(`DELETE NOTFS API hit`)
  try{

  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not Delete Notifications'})
  }
}

module.exports={
  getNotifications,
  deleteNotification
}