const Announcement = require("../../models/muslim_user_models/muslimAnnouncementModel");
const DeviceToken = require("../../models/common_models/deviceTokenModel");
const User = require("../../models/common_models/userModel");
const MuslimPreference=require('../../models/muslim_user_models/muslimUserPreferencesModel')

const { findNearByPeople, notifyUsers, getProfileImage } = require("../utils/utils");
const { ANNOUNCEMENT_CHANNEL_ID } = require("../utils/constants");

//Take announcement Data and make it available to everyone
const makeAnnouncement = async (req, res) => {
  console.log("Make Muslim Announcement API hit");
  const { latitude, longitude, category, announcedBy, statement, avatar } = req.body;

  try {
    const user = await User.findOne({ username: announcedBy });

    if (user) {
      if (longitude && latitude) {
        const peopleAround = await findNearByPeople(longitude, latitude);

        const targetAudience = [];
        await peopleAround.map((person) => {
          targetAudience.push(person);
        });

        const newAnnouncement = await Announcement.create({
          statement: statement,
          category: category,
          announcedBy: announcedBy,
          location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          targetAudience,
          avatar:avatar
        });

        if (newAnnouncement) {

            const title=`New Announcement by ${announcedBy.toUpperCase()}`
            const body=`${statement}` 
            const receivers=await DeviceToken.find({},{_id:0,__v:0})   //Only username,deviceToken are returned
            //We could send to only those who has subscribed to announcement notfs in preferences


            //Get only device tokens that are targeted i.e within range
            let recepients = receivers.filter(receiver => targetAudience.includes(receiver.username));
            const totalReceivers=await notifyUsers(title,body, recepients,ANNOUNCEMENT_CHANNEL_ID, newAnnouncement.avatar)

          res.status(200).send({
            success: true,
            msg: `Announcement sent to ${totalReceivers} people around your location`,
          });

        } else {
          console.log("Could not created");
          res
            .status(400)
            .send({ msg: "Could not create announcement", success: false });
        }
      } else {
        res.status(200).send({ msg: "Invalid Location", success: false });
      }
    } else {
      res.status(200).send({ msg: "User Does not exist", success: false });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Takes username, gets all announcements
const getAllAnnouncements = async (req, res) => {

  console.log("Get all Announcement API hit");

  try {
    const {username}=req.body
     let announcements=await Announcement.find({"targetAudience":username})
    res
      .status(200)
      .send({ msg: "Here are All Announcements", success: true, data: announcements });

  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Takes Announcement Id and username, deletes announcement
const deleteAnnouncement = async (req, res) => {
  console.log("Delete Announcement API hit");

  try {
    const {username, announcementId}=req.body

    await Announcement.updateOne({_id:announcementId,targetAudience:username},{$pullAll:{
        targetAudience:[username]
    }})

    const announcements=await Announcement.find({targetAudience:username})

    res.status(200).send({
      msg: "Announcement Deleted Successfully",
      success: true,
      data: announcements,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  makeAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement,
};
