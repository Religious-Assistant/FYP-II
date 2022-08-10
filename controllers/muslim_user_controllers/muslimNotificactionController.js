const  MuslimNotification = require("../../models/muslim_user_models/muslimUserNotificationModel");

const getUserNotifications=async(req, res)=>{

  console.log(`GET NOTFS API hit`)
  try{

    const {username}=req.body
    const result=await MuslimNotification.find({receivedBy:username})

    if(result.length>0){
      res.status(200).send({success:true,msg:`Fetched Notifications Successfully`, data:result})
    }
    else{
      res.status(200).send({success:false,msg:`No Notification found`})
    }
  }
  catch(err){
    res.status(400).send({success:false,msg:'Could not load Notifications'})
  }
}

const deleteMuslimNotification = async (req, res) => {
  console.log("Delete Announcement API hit");

  try {
    const { username, notificationId } = req.body;

    await MuslimNotification.findOneAndDelete({ _id: notificationId, receivedBy: username });

    const notifictions = await MuslimNotification.find({ receivedBy: username });

    res.status(200).send({
      msg: "Notification Deleted Successfully",
      success: true,
      data: notifictions,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports={
  getUserNotifications,
  deleteMuslimNotification
}