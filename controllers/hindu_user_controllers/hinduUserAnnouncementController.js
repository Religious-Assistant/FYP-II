const Announcement = require("../../models/hindu_user_models/hinduAnnouncementModel");
const User = require("../../models/common_models/userModel");


const {
  findNearByPeople,
  notifyUsers,
  saveNotificationForMuslimUser,
  getNotificationReceivers,
  saveNotificationForHinduUser,
} = require("../utils/utils");
const { ANNOUNCEMENT_CHANNEL_ID, announcement_notification_logo } = require("../utils/constants");

//Take announcement Data and make it available to everyone
const makeAnnouncement = async (req, res) => {
  console.log("Make Hindu Announcement API hit");
  const { latitude, longitude, category, announcedBy, statement, avatar } =
    req.body;

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
          avatar: avatar,
        });

        if (newAnnouncement) {
          const title = `Announcement by ${announcedBy.toUpperCase()}`;
          const body = `${statement}`;

          //Returns muslim users in range
          const recepients=await getNotificationReceivers(targetAudience,1) 

          saveNotificationForHinduUser(recepients, title, statement,category, newAnnouncement._id, announcement_notification_logo).then(async (data) => {
              const totalReceivers = await notifyUsers(
                title,
                body,
                recepients,
                ANNOUNCEMENT_CHANNEL_ID,
                newAnnouncement.avatar,
              );

              res.status(200).send({
                success: true,
                msg: `Announcement sent to ${totalReceivers} people around your location`,
              });
            })
            .catch((error) => {
              res
                .status(400)
                .send({ msg: "Could not notify users", success: false });
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

const getAllAnnouncements = async (req, res) => {
  console.log("Get all Announcement API hit");

  try {
    const { username } = req.body;
    let announcements = await Announcement.find({ targetAudience: username });
    res.status(200).send({
      msg: "Here are All Announcements",
      success: true,
      data: announcements,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAnnouncement = async (req, res) => {
  console.log("Delete Announcement API hit");

  try {
    const { username, announcementId } = req.body;

    await Announcement.updateOne(
      { _id: announcementId, targetAudience: username },
      {
        $pullAll: {
          targetAudience: [username],
        },
      }
    );

    const announcements = await Announcement.find({ targetAudience: username });

    res.status(200).send({
      msg: "Announcement Deleted Successfully",
      success: true,
      data: announcements,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//For development

const deleteAllAnnouncements = async (req, res) => {
  console.log("Delete All Announcements API hit");

  try {
    await Announcement.deleteMany();

    res.status(200).send({
      msg: "Announcements Deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  makeAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement,
  deleteAllAnnouncements,
};
